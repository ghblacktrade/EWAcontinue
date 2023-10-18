import { IsNotEmpty, IsNumberString, ValidateNested } from 'class-validator';

import { TelemetryEnergyPhaseEntity } from './telemetry.energy.phase.entity';

export class TelemetryEnergyEntity {
  @IsNotEmpty()
  @ValidateNested()
  phaseA: TelemetryEnergyPhaseEntity;
  @IsNotEmpty()
  @ValidateNested()
  phaseB: TelemetryEnergyPhaseEntity;
  @IsNotEmpty()
  @ValidateNested()
  phaseC: TelemetryEnergyPhaseEntity;

  @IsNotEmpty()
  @IsNumberString()
  tp: string;
  @IsNotEmpty()
  @IsNumberString()
  tq: string;
  @IsNotEmpty()
  @IsNumberString()
  ts: string;
  @IsNotEmpty()
  @IsNumberString()
  ap: string;
  @IsNotEmpty()
  @IsNumberString()
  an: string;
  @IsNotEmpty()
  @IsNumberString()
  rp: string;
  @IsNotEmpty()
  @IsNumberString()
  rn: string;
  @IsNotEmpty()
  @IsNumberString()
  se: string;
  @IsNotEmpty()
  @IsNumberString()
  freq: string;
}
