import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import {
  NotificationTrigger,
  type NotificationChannel,
  type Prisma,
  NotificationEntityType,
} from '@prisma/client';
import { Queue } from 'bull';

import * as dayjs from 'dayjs';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotifyService {
  private readonly includeProperties: Prisma.NotificationInclude = {
    recipients: {
      select: {
        read: true,
        channel: true,
        user: {
          select: {
            id: true,
            email: true,

            devices: {
              select: {
                pushId: true,
                platform: true,
                locale: true,
              },
            },
          },
        },
      },
    },
  };

  constructor(
    @InjectQueue('main') private mainQueue: Queue,
    private prisma: PrismaService,
  ) {}

  async sendTelemetryNotification({
    ess,
    recipients,
    ...data
  }: Pick<
    Prisma.NotificationCreateInput,
    'message' | 'type' | 'additional' | 'entityId'
  > & {
    ess: { code: string; id: string };
    recipients: Array<{ userId: string; channel: Array<NotificationChannel> }>;
  }) {
    const essUrl = `${process.env.DOMAIN}/ess/${ess.id}`;

    const created = dayjs().format('DD.MM.YYYY HH:mm:ss [UTC]');

    const notification = await this.prisma.notification.create({
      data: {
        ...data,
        recipients: {
          createMany: { data: recipients },
        },
        additional: {
          created,
          message: data.message,
          essCode: ess.code,
          essUrl,
        },
        trigger: NotificationTrigger.control_pcb_telemetry,
        entityType: NotificationEntityType.ess,
        title: `{{notification_type_${data.type}}} ${ess.code}`,
      },
      include: this.includeProperties,
    });

    return this.mainQueue.add('main-job', notification);
  }
}
