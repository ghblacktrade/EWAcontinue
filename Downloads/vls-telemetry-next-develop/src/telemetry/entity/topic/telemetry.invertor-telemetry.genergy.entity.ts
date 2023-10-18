import { IsNotEmpty, IsNumberString } from 'class-validator';

export class InvertorTelemetryGenergyEntity {
  @IsNotEmpty()
  @IsNumberString()
  total: string;
  @IsNotEmpty()
  @IsNumberString()
  year: string;
  @IsNotEmpty()
  @IsNumberString()
  month: string;
  @IsNotEmpty()
  @IsNumberString()
  day: string;
}
