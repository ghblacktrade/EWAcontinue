import type {
  TelemetryWarningProtocolType,
  TelemetryWarningType,
} from '@prisma/client';

export class TelemetryWarningsEntity {
  id: string;

  batteryId: string;

  createdAt: Date;

  type: TelemetryWarningType;

  protocolType: TelemetryWarningProtocolType;

  message: string;

  bitKey: string;

  bitValue?: string | null;
}
