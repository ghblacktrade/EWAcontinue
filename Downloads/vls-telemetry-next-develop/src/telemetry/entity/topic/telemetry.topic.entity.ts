import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

import { TelemetryBatteriesEntity } from './telemetry.batteries.entity';
import { TelemetryEnergyEntity } from './telemetry.energy.entity';
import { InvertorTelemetryEntity } from './telemetry.invertor-telemetry.entity';
import { TelemetryStatusEntity } from './telemetry.status.entity';

export class TelemetryTopicEntity {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  deviceId: string;

  @IsOptional()
  @IsString()
  time?: string;

  @IsNotEmpty()
  @IsString()
  day: string;

  @IsNotEmpty()
  @ValidateNested()
  telemetry: InvertorTelemetryEntity;

  @IsNotEmpty()
  @ValidateNested()
  energy: TelemetryEnergyEntity;

  @IsNotEmpty()
  @ValidateNested()
  status: TelemetryStatusEntity;

  @IsNotEmpty()
  @ValidateNested()
  batteries: TelemetryBatteriesEntity;
}
