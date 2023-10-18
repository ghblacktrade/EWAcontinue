import { TelemetryWarningType } from '@prisma/client';

import type { bitKeyOf30BitsProtocol } from '../interface/warning-protocols.30bits.bitkey-type';

type warningMaskElement = {
  bitKey: bitKeyOf30BitsProtocol;
  getKind: (isA1StatusCode?: boolean) => string;
};

export const protocol30Bits = [
  { bitKey: 'a0', getKind: () => TelemetryWarningType.reserved },
  { bitKey: 'a1', getKind: () => TelemetryWarningType.error },
  { bitKey: 'a2', getKind: () => TelemetryWarningType.error },
  { bitKey: 'a3', getKind: () => TelemetryWarningType.error },
  { bitKey: 'a4', getKind: () => TelemetryWarningType.error },
  { bitKey: 'a5', getKind: () => TelemetryWarningType.warning },
  { bitKey: 'a6', getKind: () => TelemetryWarningType.warning },
  { bitKey: 'a7', getKind: () => TelemetryWarningType.error },
  { bitKey: 'a8', getKind: () => TelemetryWarningType.error },
  {
    bitKey: 'a9',
    getKind: (isA1StatusCode: boolean) =>
      isA1StatusCode
        ? TelemetryWarningType.error
        : TelemetryWarningType.warning,
  },
  {
    bitKey: 'a10',
    getKind: (isA1StatusCode: boolean) =>
      isA1StatusCode
        ? TelemetryWarningType.error
        : TelemetryWarningType.warning,
  },
  {
    bitKey: 'a11',
    getKind: (isA1StatusCode: boolean) =>
      isA1StatusCode
        ? TelemetryWarningType.error
        : TelemetryWarningType.warning,
  },
  { bitKey: 'a12', getKind: () => TelemetryWarningType.warning },
  { bitKey: 'a13', getKind: () => TelemetryWarningType.reserved },
  { bitKey: 'a14', getKind: () => TelemetryWarningType.warning },
  { bitKey: 'a15', getKind: () => TelemetryWarningType.reserved },
  {
    bitKey: 'a16',
    getKind: (isA1StatusCode: boolean) =>
      isA1StatusCode
        ? TelemetryWarningType.error
        : TelemetryWarningType.warning,
  },
  { bitKey: 'a17', getKind: () => TelemetryWarningType.warning },
  { bitKey: 'a18', getKind: () => TelemetryWarningType.error },
  { bitKey: 'a19', getKind: () => TelemetryWarningType.error },
  { bitKey: 'a20', getKind: () => TelemetryWarningType.error },
  { bitKey: 'a21', getKind: () => TelemetryWarningType.error },
  { bitKey: 'a22', getKind: () => TelemetryWarningType.error },
  { bitKey: 'a23', getKind: () => TelemetryWarningType.error },
  { bitKey: 'a24', getKind: () => TelemetryWarningType.error },
  { bitKey: 'a25', getKind: () => TelemetryWarningType.warning },
  { bitKey: 'a26', getKind: () => TelemetryWarningType.warning },
  { bitKey: 'a27', getKind: () => TelemetryWarningType.warning },
  { bitKey: 'a28', getKind: () => TelemetryWarningType.warning },
  { bitKey: 'a29', getKind: () => TelemetryWarningType.warning },
  { bitKey: 'a30', getKind: () => TelemetryWarningType.reserved },
  { bitKey: 'a31', getKind: () => TelemetryWarningType.reserved },
] as const satisfies ReadonlyArray<warningMaskElement>;
