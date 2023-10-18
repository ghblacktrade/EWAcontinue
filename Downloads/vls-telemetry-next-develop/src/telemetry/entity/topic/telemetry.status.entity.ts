import { ArrayNotEmpty, IsEnum } from 'class-validator';

import { telemetryFrequencyStatus } from '../../interface/telemetry.frequency-status';

import { telemetryPhaseStatus } from 'src/telemetry/interface/telemetry.phase-status';

export class TelemetryStatusEntity {
  @ArrayNotEmpty()
  @IsEnum(telemetryPhaseStatus, { each: true })
  phaseA: Array<telemetryPhaseStatus>;
  @ArrayNotEmpty()
  @IsEnum(telemetryPhaseStatus, { each: true })
  phaseB: Array<telemetryPhaseStatus>;
  @ArrayNotEmpty()
  @IsEnum(telemetryPhaseStatus, { each: true })
  phaseC: Array<telemetryPhaseStatus>;
  @ArrayNotEmpty()
  @IsEnum(telemetryFrequencyStatus, { each: true })
  freq: Array<telemetryFrequencyStatus>;
}
