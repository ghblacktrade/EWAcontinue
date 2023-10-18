import type { TelemetryWarningsEntity } from '../entity/telemetry-warnings.entity';

export type parsedWarning = Pick<
  TelemetryWarningsEntity,
  'message' | 'type' | 'protocolType' | 'bitKey' | 'bitValue'
>;
