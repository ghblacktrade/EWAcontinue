import { Module } from '@nestjs/common';

import { TelemetryWarningService } from './telemetry-warning.service';

@Module({
  providers: [TelemetryWarningService],
  exports: [TelemetryWarningService],
})
export class TelemetryWarningModule {}
