import { IsNotEmpty, IsNumberString } from 'class-validator';

export class TelemetryEnergyPhaseEntity {
  @IsNotEmpty()
  @IsNumberString()
  Urms: string;
  @IsNotEmpty()
  @IsNumberString()
  Irms: string;
  @IsNotEmpty()
  @IsNumberString()
  p: string;
  @IsNotEmpty()
  @IsNumberString()
  q: string;
  @IsNotEmpty()
  @IsNumberString()
  s: string;
  @IsNotEmpty()
  @IsNumberString()
  pf: string;
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
  pha: string;
  @IsNotEmpty()
  @IsNumberString()
  thdU: string;
  @IsNotEmpty()
  @IsNumberString()
  Ufund: string;
}
