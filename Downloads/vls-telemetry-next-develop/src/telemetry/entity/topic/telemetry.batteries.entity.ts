import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';

enum batteriesStatus {
  OK = 'OK',
  UDIF_TOO_HIGHT = 'Udif too high',
  OVERCHARGE = 'overcharge',
  OVERDISCHARGE = 'overdischarge',
  CHARGE_OVERCURRENT = 'charge overcurrent',
  DISCHARGE_OVERCURRENT = 'discharge overcurrent',
  SHORT_CIRCUIT = 'short circuit',
  BATTERY_BLOCKED = 'battery blocked',
}

export class TelemetryBatteriesEntity {
  @IsNotEmpty()
  @IsString()
  Crem_bat: string;
  @IsNotEmpty()
  @IsString()
  Ibat: string;
  @IsNotEmpty()
  @IsString()
  Ubat: string;
  @IsNotEmpty()
  @IsString()
  ch_lvl: string;
  @IsNotEmpty()
  @IsString()
  Tbat_max: string;
  @IsNotEmpty()
  @IsString()
  Tmosfet_max: string;
  @IsNotEmpty()
  @IsString()
  Ucell_min: string;
  @IsNotEmpty()
  @IsString()
  Ucell_max: string;
  @IsNotEmpty()
  @IsString()
  Udif_max: string;
  @IsNotEmpty()
  @IsArray()
  @IsEnum(batteriesStatus, { each: true })
  status: Array<batteriesStatus>;
}
