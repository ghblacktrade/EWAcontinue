import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';

import {
  NotificationType,
  Prisma,
  ChargingStatus,
  NotificationChannel,
  Role,
} from '@prisma/client';
import { Cache } from 'cache-manager';

import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';

import { PrismaService } from '../prisma/prisma.service';

import { TelemetryWarningService } from '../telemetry-warning/telemetry-warning.service';

import { warningsNotificationBitkeys } from './constants/warning-notification-bitkeys';
import { TelemetryEnergyEntity } from './entity/topic/telemetry.energy.entity';
import { TelemetryEnergyPhaseEntity } from './entity/topic/telemetry.energy.phase.entity';
import { InvertorTelemetryEntity } from './entity/topic/telemetry.invertor-telemetry.entity';
import { InvertorTelemetryGenergyEntity } from './entity/topic/telemetry.invertor-telemetry.genergy.entity';
import { TelemetryStatusEntity } from './entity/topic/telemetry.status.entity';
import { TelemetryTopicEntity } from './entity/topic/telemetry.topic.entity';

import { CheckTriggers } from './helpers/check-trigger';
import type { TelemetryWithWarnings } from './interface/telemetry.with-warnings';

import { NotifyService } from 'src/notify/notify.service';
import type { parsedWarning } from 'src/telemetry-warning/interface/parsed-warning';

type BaseControlPcb = { id: string; timeZone: string | null };

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

const sumFromStrings = (...strings: Array<string>): number => {
  return strings.reduce((accum, str) => accum + Number(str) || 0, 0);
};

const multiplyFromStrings = (...strings: Array<string>): number => {
  return strings.reduce((accum, str) => accum * Number(str), 1);
};

@Injectable()
export class TelemetryService {
  private readonly logger = new Logger(TelemetryService.name);
  private readonly PREFIX_SHOW_NOTIFICATION_WHEN_CHARGE_100 =
    'SHOW_NOTIFICATION_WHEN_100_';

  constructor(
    private prisma: PrismaService,
    private telemetryWarningService: TelemetryWarningService,
    private notificationService: NotifyService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // where: Prisma.batteriesWhereInput
  async findControlPcb(code: string): Promise<BaseControlPcb> {
    try {
      const cached = await this.cacheManager.get<BaseControlPcb>(code);
      if (cached) return cached;

      const { ess, ...rest } = await this.prisma.batteries.findFirstOrThrow({
        where: {
          code,
        },
        select: {
          id: true,
          ess: {
            select: {
              timeZone: true,
            },
          },
        },
      });

      const res: BaseControlPcb = {
        ...rest,
        timeZone: ess?.timeZone,
      };

      await this.cacheManager.set(code, res);

      return res;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException('Control PCB not found');
        }
      }
      throw e;
    }
  }

  constructTelemetryValidator(data: TelemetryTopicEntity) {
    const validator = new TelemetryTopicEntity();
    Object.assign(validator, data);
    const validatorTelemetry = new InvertorTelemetryEntity();
    validator.telemetry = Object.assign(validatorTelemetry, data.telemetry);
    const validatorTelemetryGenergy = new InvertorTelemetryGenergyEntity();
    validator.telemetry.genergy = Object.assign(
      validatorTelemetryGenergy,
      data.telemetry.genergy,
    );

    const validatorEnergy = new TelemetryEnergyEntity();
    validator.energy = Object.assign(validatorEnergy, data.energy);
    const validatorEnergyPhaseA = new TelemetryEnergyPhaseEntity();
    validator.energy.phaseA = Object.assign(
      validatorEnergyPhaseA,
      data.energy.phaseA,
    );
    const validatorEnergyPhaseB = new TelemetryEnergyPhaseEntity();
    validator.energy.phaseB = Object.assign(
      validatorEnergyPhaseB,
      data.energy.phaseB,
    );
    const validatorEnergyPhaseC = new TelemetryEnergyPhaseEntity();
    validator.energy.phaseC = Object.assign(
      validatorEnergyPhaseC,
      data.energy.phaseC,
    );

    const validatorStatus = new TelemetryStatusEntity();
    validator.status = Object.assign(validatorStatus, data.status);
    return validator;
  }

  getChargingStatusByPowerDirection(statusNumber: number): ChargingStatus {
    switch (statusNumber) {
      case 0:
        return ChargingStatus.none;
      case 1:
        return ChargingStatus.charging;
      case 2:
        return ChargingStatus.discharging;
      default: {
        this.logger.warn(
          `mapChargingStatus(): invalid status - ${statusNumber}`,
        );
        return ChargingStatus.none;
      }
    }
  }

  mapSolarPanelStatus(
    statusNumber: number,
  ): 'abnormal' | 'notCharging' | 'charging' {
    switch (statusNumber) {
      case 0:
        return 'abnormal';
      case 1:
        return 'notCharging';
      case 2:
        return 'charging';
      default: {
        this.logger.warn(
          `mapSolarPanelStatus(): invalid status - ${statusNumber}`,
        );
        return 'abnormal';
      }
    }
  }

  extractDateFromTelemetry(
    day: string,
    time?: string,
    timeZone?: string,
  ): Date {
    const format = 'DD.MM.YYYY HH:mm:ss';

    // Just UTC
    if (!timeZone && !time) return dayjs().toDate();

    // ESS current time -> UTC
    if (timeZone && !time) return dayjs().tz(timeZone).toDate();

    // Time without TZ -> UTC
    if (!timeZone && time) return dayjs(`${day} ${time}`, format).toDate();

    // Time with TZ -> UTC
    // eslint-disable-next-line import/namespace
    const date = dayjs.tz(`${day} ${time}`, format, timeZone);
    return date.toDate();
  }

  async createTelemetry(
    batteryId: string,
    data: TelemetryTopicEntity,
    timeZone?: string,
  ) {
    const { telemetry, energy, status, day, time } = data;

    const createdAt = this.extractDateFromTelemetry(day, time, timeZone);

    const [, solarPanel1Status, , loadConnection, batteryPowerDirection] =
      telemetry.status.split(',');

    const parsedWarnings = this.telemetryWarningService.parseTelemetryWarnings(
      telemetry.warnings,
    );

    const createData = {
      createdAt,
      batteries: {
        connect: {
          id: batteryId,
        },
      },
      chargeLevelPercent: Number(telemetry.batt_capacity),
      photovoltaticsPowerW: Number(telemetry.pv1_input_pwr),
      gridConsumptionPowerW: sumFromStrings(
        energy.phaseA.p,
        energy.phaseB.p,
        energy.phaseC.p,
      ),
      chargePowerW: multiplyFromStrings(
        telemetry.batt_charging,
        telemetry.batt_volt,
      ),
      houseLoadPowerW: sumFromStrings(
        telemetry.out_act_pwr,
        energy.phaseB.p,
        energy.phaseC.p,
      ),
      gridConsumptionEnergyWh:
        sumFromStrings(energy.phaseA.ap, energy.phaseB.ap, energy.phaseC.ap) *
        1000,
      generatedEnergyTotalWh: Number(telemetry.genergy.total) || 0,
      generatedEnergyYearWh: Number(telemetry.genergy.year) || 0,
      generatedEnergyMonthWh: Number(telemetry.genergy.month) || 0,
      generatedEnergyDayWh: Number(telemetry.genergy.day) || 0,
      solarPanel1Status: this.mapSolarPanelStatus(Number(solarPanel1Status)),
      chargingStatus: this.getChargingStatusByPowerDirection(
        Number(batteryPowerDirection),
      ),
      chargingCurrentA: Number(telemetry.batt_charging) || 0,
      batteryVoltageV: Number(telemetry.batt_volt) || 0,
      gridVoltageV: Number(telemetry.grid_volt) || 0,
      isConnectedToGrid: !parsedWarnings.some(
        (warning) => warning.bitKey === 'B' || warning.bitKey === 'a5',
      ),
      isConnectedToHouse: Number(loadConnection) === 1,
      outputActivePowerW: Number(telemetry.out_act_pwr) || 0,
      dischargingCurrentA: Number(telemetry.batt_discharge) || 0,
      phaseAStatus: status.phaseA[0],
      phaseBStatus: status.phaseB[0],
      phaseCStatus: status.phaseC[0],
      frequencyStatus: status.freq[0],

      phaseAPowerW: Number(energy.phaseA.p),
      phaseBPowerW: Number(energy.phaseB.p),
      phaseCPowerW: Number(energy.phaseC.p),
      phaseAUrmsV: Number(energy.phaseA.Urms),
      phaseBUrmsV: Number(energy.phaseB.Urms),
      phaseCUrmsV: Number(energy.phaseC.Urms),
      phaseAIrmsA: Number(energy.phaseA.Irms),
      phaseBIrmsA: Number(energy.phaseB.Irms),
      phaseCIrmsA: Number(energy.phaseC.Irms),
      photovoltaticsVoltageV: Number(telemetry.pv1_input_volt),
      outputApparentPowerVA: Number(telemetry.out_app_pwr),
      outputVoltageV: Number(telemetry.out_volt),
    } satisfies Prisma.telemetryCreateInput;

    const res = await this.prisma.telemetry.upsert({
      select: {
        batteries: {
          select: {
            ess: {
              select: {
                code: true,
                id: true,
              },
            },
          },
        },
      },
      where: {
        batteryId_createdAt: {
          batteryId,
          createdAt,
        },
      },
      create: createData,
      update: {},
    });

    // TODO: check if it was update telemetry -> dont create warnings
    await this.prisma.telemetry_warning.createMany({
      data: parsedWarnings.map((warning) => ({
        ...warning,
        createdAt,
        batteryId,
      })),
    });

    const ess = res.batteries.ess;
    if (ess) {
      await this.createNotifications(
        batteryId,
        parsedWarnings,
        createData,
        ess,
      );
    }
  }

  async createNotifications(
    batteryId: string,
    currentWarnings: Array<parsedWarning>,
    currentTelemetry: Prisma.telemetryCreateInput,
    ess: { id: string; code: string },
  ) {
    const previousData = await this.cacheManager.get<TelemetryWithWarnings>(
      batteryId,
    );
    const showNotificationWhen100CacheKey = `${this.PREFIX_SHOW_NOTIFICATION_WHEN_CHARGE_100}${batteryId}`;

    const showNotificationWhen100 = await this.cacheManager.get<boolean>(
      showNotificationWhen100CacheKey,
    );

    if (!showNotificationWhen100 && currentTelemetry.chargeLevelPercent <= 90) {
      await this.cacheManager.set(showNotificationWhen100CacheKey, true);
    }

    await this.cacheManager.set(
      batteryId,
      {
        telemetry: currentTelemetry,
        warnings: currentWarnings,
      } satisfies TelemetryWithWarnings,
      2 * 60 * 1000,
    ); // 2 minutes

    const recipients = await this.getRecipients(ess.code);
    const sharedParams = {
      recipients,
      entityId: ess.id,
      ess,
    };

    const previousTelemetry = previousData?.telemetry;
    const previousWarnings = previousData?.warnings || [];

    const protocolType = currentWarnings.at(0)?.protocolType;

    const notificationPromises: Array<Promise<unknown>> = [];

    const checkTriggers = new CheckTriggers(
      currentTelemetry,
      currentWarnings,
      previousTelemetry,
      previousWarnings,
    );

    if (checkTriggers.isShowNotificationWhen100(showNotificationWhen100)) {
      await this.cacheManager.set(showNotificationWhen100CacheKey, false);
      notificationPromises.push(
        this.notificationService.sendTelemetryNotification({
          ...sharedParams,
          message: '{{notification_trigger_telemetry_info_battery_charged}}',
          type: NotificationType.info,
        }),
      );
    }

    if (checkTriggers.connectedToGridFlagChangeTrigger()) {
      notificationPromises.push(
        this.notificationService.sendTelemetryNotification({
          ...sharedParams,
          message: currentTelemetry.isConnectedToGrid
            ? '{{notification_trigger_telemetry_info_grid_connection_restored}}'
            : '{{notification_trigger_telemetry_info_grid_disconnected}}',
          type: NotificationType.info,
        }),
      );
    }

    if (checkTriggers.urmsTooLowTrigger()) {
      notificationPromises.push(
        this.notificationService.sendTelemetryNotification({
          ...sharedParams,
          message: '{{notification_trigger_telemetry_info_low_grid_urms}}',
          type: NotificationType.info,
        }),
      );
    }

    if (checkTriggers.urmsTooHighTrigger()) {
      notificationPromises.push(
        this.notificationService.sendTelemetryNotification({
          ...sharedParams,
          message: '{{notification_trigger_telemetry_info_high_grid_urms}}',
          type: NotificationType.info,
        }),
      );
    }

    if (checkTriggers.frequencyTooLowTrigger()) {
      notificationPromises.push(
        this.notificationService.sendTelemetryNotification({
          ...sharedParams,
          message: '{{notification_trigger_telemetry_info_low_frequency}}',
          type: NotificationType.info,
        }),
      );
    }

    if (checkTriggers.frequencyTooHighTrigger()) {
      notificationPromises.push(
        this.notificationService.sendTelemetryNotification({
          ...sharedParams,
          message: '{{notification_trigger_telemetry_info_high_frequency}}',
          type: NotificationType.info,
        }),
      );
    }

    if (checkTriggers.isProtocol18Bits(protocolType)) {
      warningsNotificationBitkeys.forEach((bitKey) => {
        if (checkTriggers.telemetryWarningTriggerByBitKey(bitKey)) {
          notificationPromises.push(
            this.notificationService.sendTelemetryNotification({
              ...sharedParams,
              message: `{{notification_trigger_telemetry_warning_${bitKey}}}`,
              type: NotificationType.warning,
            }),
          );
        }
      });

      const errorBitValue = checkTriggers.telemetryErrorTrigger();
      if (errorBitValue) {
        notificationPromises.push(
          this.notificationService.sendTelemetryNotification({
            ...sharedParams,
            message: `{{notification_trigger_telemetry_error_${errorBitValue}}}`,
            type: NotificationType.fail,
          }),
        );
      }
    }

    await Promise.all(notificationPromises);
  }

  getChannelsByRole(role: Role): Array<NotificationChannel> {
    switch (role) {
      case Role.admin:
      case Role.moderator:
      case Role.installer:
        return [];
      case Role.client:
        return [NotificationChannel.push];
      case Role.service_engineer:
        return [NotificationChannel.email, NotificationChannel.push]; // TODO: remove push
    }
  }

  async getRecipients(
    essCode: string,
  ): Promise<Array<{ userId: string; channel: Array<NotificationChannel> }>> {
    const cached = await this.cacheManager.get<
      Array<{ userId: string; channel: Array<NotificationChannel> }>
    >(essCode);
    if (cached) return cached;

    const recipientIds = await this.prisma.user.findMany({
      select: {
        id: true,
        role: true,
      },
      where: {
        OR: [
          {
            role: {
              in: [Role.admin, Role.moderator, Role.installer],
            },
          },
          {
            ess: {
              some: {
                ess: {
                  code: essCode,
                },
              },
            },
            role: {
              in: [Role.client, Role.service_engineer],
            },
          },
        ],
      },
    });

    const recipients = recipientIds.map((recipient) => ({
      userId: recipient.id,
      channel: this.getChannelsByRole(recipient.role),
    }));

    await this.cacheManager.set(essCode, recipients, 2 * 60 * 1000); // 2 min
    return recipients;
  }
}
