import { Prisma, TelemetryWarningProtocolType } from '@prisma/client';

import { errorNotificationBitValues } from '../constants/error-notifications-bitvalues';
import { telemetryFrequencyStatus } from '../interface/telemetry.frequency-status';
import { telemetryPhaseStatus } from '../interface/telemetry.phase-status';

import type { parsedWarning } from 'src/telemetry-warning/interface/parsed-warning';
import type { bitKeyOf18BitsProtocol } from 'src/telemetry-warning/interface/warning-protocols.18bits.bitkey-type';

export class CheckTriggers {
  currentTelemetry: Prisma.telemetryCreateInput;
  previousTelemetry?: Prisma.telemetryCreateInput;
  objectifiedCurrentWarnings: Partial<Record<bitKeyOf18BitsProtocol, string>>;
  objectifiedPreviousWarnings?: Partial<Record<bitKeyOf18BitsProtocol, string>>;

  constructor(
    currentTelemetry: Prisma.telemetryCreateInput,
    currentWarnings: Array<parsedWarning>,
    previousTelemetry?: Prisma.telemetryCreateInput,
    previousWarnings?: Array<parsedWarning>,
  ) {
    this.currentTelemetry = currentTelemetry;
    this.previousTelemetry = previousTelemetry;
    this.objectifiedCurrentWarnings =
      this.objectify18BitWarnings(currentWarnings);
    this.objectifiedPreviousWarnings =
      this.objectify18BitWarnings(previousWarnings);
  }

  private objectify18BitWarnings(
    warnings: Array<parsedWarning>,
  ): Partial<Record<bitKeyOf18BitsProtocol, string>> {
    return warnings.reduce(
      (accum: Partial<Record<bitKeyOf18BitsProtocol, string>>, warning) => ({
        ...accum,
        [warning.bitKey]: warning.bitValue || true,
      }),
      {},
    );
  }

  urmsTooLowTrigger() {
    return (
      [
        this.currentTelemetry.phaseAStatus,
        this.currentTelemetry.phaseBStatus,
        this.currentTelemetry.phaseCStatus,
      ].includes(telemetryPhaseStatus.URMS_TOO_LOW) &&
      !(
        this.previousTelemetry &&
        [
          this.previousTelemetry?.phaseAStatus,
          this.previousTelemetry?.phaseBStatus,
          this.previousTelemetry?.phaseCStatus,
        ].includes(telemetryPhaseStatus.URMS_TOO_LOW)
      )
    );
  }

  urmsTooHighTrigger() {
    return (
      [
        this.currentTelemetry.phaseAStatus,
        this.currentTelemetry.phaseBStatus,
        this.currentTelemetry.phaseCStatus,
      ].includes(telemetryPhaseStatus.URMS_TOO_HIGH) &&
      !(
        this.previousTelemetry &&
        [
          this.previousTelemetry.phaseAStatus,
          this.previousTelemetry.phaseBStatus,
          this.previousTelemetry.phaseCStatus,
        ].includes(telemetryPhaseStatus.URMS_TOO_HIGH)
      )
    );
  }

  frequencyTooLowTrigger() {
    return (
      this.currentTelemetry.frequencyStatus ===
        telemetryFrequencyStatus.TOO_LOW &&
      this.previousTelemetry?.frequencyStatus !==
        telemetryFrequencyStatus.TOO_LOW
    );
  }

  frequencyTooHighTrigger() {
    return (
      this.currentTelemetry.frequencyStatus ===
        telemetryFrequencyStatus.TOO_HIGH &&
      this.previousTelemetry?.frequencyStatus !==
        telemetryFrequencyStatus.TOO_HIGH
    );
  }

  connectedToGridFlagChangeTrigger() {
    return (
      this.currentTelemetry.isConnectedToGrid !==
      this.previousTelemetry?.isConnectedToGrid
    );
  }

  telemetryWarningTriggerByBitKey(bitKey: bitKeyOf18BitsProtocol) {
    return (
      this.objectifiedCurrentWarnings[bitKey] &&
      !this.objectifiedPreviousWarnings[bitKey]
    );
  }

  telemetryErrorTrigger() {
    if (
      this.objectifiedCurrentWarnings.AA &&
      !this.objectifiedPreviousWarnings.AA &&
      errorNotificationBitValues[this.objectifiedCurrentWarnings.AA]
    ) {
      return this.objectifiedCurrentWarnings.AA;
    }
  }

  isProtocol18Bits(protocol?: TelemetryWarningProtocolType) {
    return protocol === TelemetryWarningProtocolType.bit18;
  }

  isShowNotificationWhen100(showNotificationWhen100: boolean) {
    return (
      this.currentTelemetry.chargeLevelPercent == 100 && showNotificationWhen100
    );
  }
}
