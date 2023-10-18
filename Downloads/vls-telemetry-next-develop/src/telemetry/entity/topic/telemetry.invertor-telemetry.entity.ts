import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { InvertorTelemetryGenergyEntity } from './telemetry.invertor-telemetry.genergy.entity';

export class InvertorTelemetryEntity {
  @IsNotEmpty()
  @IsNumberString()
  grid_volt: string;
  @IsNotEmpty()
  @IsNumberString()
  grid_freq: string;
  @IsNotEmpty()
  @IsNumberString()
  out_volt: string;
  @IsNotEmpty()
  @IsNumberString()
  out_freq: string;
  @IsNotEmpty()
  @IsNumberString()
  out_app_pwr: string;
  @IsNotEmpty()
  @IsNumberString()
  out_act_pwr: string;
  @IsNotEmpty()
  @IsNumberString()
  out_load: string;
  @IsNotEmpty()
  @IsNumberString()
  batt_volt: string;
  @IsOptional()
  @IsNumberString()
  batt_volt_scc: string;
  @IsOptional()
  @IsNumberString()
  batt_volt_scc2: string;
  @IsNotEmpty()
  @IsNumberString()
  batt_discharge: string;
  @IsNotEmpty()
  @IsNumberString()
  batt_charging: string;
  @IsNotEmpty()
  @IsNumberString()
  batt_capacity: string;
  @IsNotEmpty()
  @IsNumberString()
  inv_tempr: string;
  @IsNotEmpty()
  @IsNumberString()
  mppt1_tempr: string;
  @IsOptional()
  @IsNumberString()
  mppt2_tempr: string;
  @IsNotEmpty()
  @IsNumberString()
  pv1_input_pwr: string;
  @IsOptional()
  @IsNumberString()
  pv2_input_pwr: string;
  @IsNotEmpty()
  @IsNumberString()
  pv1_input_volt: string;
  @IsOptional()
  @IsNumberString()
  pv2_input_volt: string;
  @IsNotEmpty()
  @IsString()
  status: `${0 | 1},${0 | 1 | 2},${0 | 1 | 2},${0 | 1},${0 | 1 | 2},${
    | 0
    | 1
    | 2},${0 | 1 | 2},${0 | 1}`;
  @IsNotEmpty()
  @IsString()
  warnings: string;
  @IsNotEmpty()
  @ValidateNested()
  genergy: InvertorTelemetryGenergyEntity;
}
