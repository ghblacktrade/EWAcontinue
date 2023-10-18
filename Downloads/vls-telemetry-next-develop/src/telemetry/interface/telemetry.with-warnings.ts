import type { Prisma } from '@prisma/client';

import type { parsedWarning } from 'src/telemetry-warning/interface/parsed-warning';

export interface TelemetryWithWarnings {
  telemetry: Prisma.telemetryCreateInput;
  warnings: Array<parsedWarning>;
}
