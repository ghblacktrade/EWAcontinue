import { Injectable } from '@nestjs/common';

import {
  TelemetryWarningProtocolType,
  TelemetryWarningType,
} from '@prisma/client';

import { protocol18Bits } from './entity/warning-protocols.18bits-mask';
import { protocol30Bits } from './entity/warning-protocols.30bits-mask';
import type { inverterTelemetryWarningProtocolRaw } from './interface/inverter-warning-protocol-raw';
import type { parsedWarning } from './interface/parsed-warning';

@Injectable()
export class TelemetryWarningService {
  private BIT18_ERROR_BIT_KEY = 'AA';

  parseWarnings18BitMaskProtocol(
    warningsBitMask: string,
  ): Array<parsedWarning> {
    return warningsBitMask
      .split(',')
      .map((bitValue, index) => ({
        bitKey: protocol18Bits[index],
        bitValue,
      }))
      .filter(({ bitValue }) => !!Number(bitValue))
      .map(({ bitKey, bitValue }) => {
        const isExceptionBitValue = bitKey === this.BIT18_ERROR_BIT_KEY;
        const message: string | undefined = isExceptionBitValue
          ? `{{telemetry_18bit_error_${bitValue}}}`
          : `{{telemetry_18bit_warning_${bitKey}}}`;

        return {
          protocolType: TelemetryWarningProtocolType.bit18,
          message: message,
          bitKey,
          bitValue: isExceptionBitValue ? bitValue : null,
          type: isExceptionBitValue
            ? TelemetryWarningType.error
            : TelemetryWarningType.warning,
        };
      });
  }

  parseWarnings30BitMaskProtocol(
    warningsBitMask: string,
  ): Array<parsedWarning> {
    const filtered = warningsBitMask
      .split(',')
      .map((bitValue, index) => ({
        bitKey: protocol30Bits[index].bitKey,
        bitValue: Number(bitValue),
        getKind: protocol30Bits[index].getKind,
      }))
      .filter(({ bitValue }) => bitValue === 1);
    const a1 = filtered.find(({ bitKey }) => bitKey === 'a1');
    const a1StatusCode = Number(a1?.bitValue) ?? 0;

    return filtered.map(({ bitKey, getKind }) => ({
      protocolType: TelemetryWarningProtocolType.bit30,
      message: `{{telemetry_30bit_warning_${bitKey}}}`,
      bitKey,
      type: getKind(Boolean(a1StatusCode)),
    }));
  }

  parseWarningsByProtocol(
    warningsBitMask: string,
    inverterWarningProtocolType: inverterTelemetryWarningProtocolRaw | string,
  ): Array<parsedWarning> {
    switch (inverterWarningProtocolType) {
      case '18': {
        return this.parseWarnings18BitMaskProtocol(warningsBitMask);
      }
      case '30': {
        return this.parseWarnings30BitMaskProtocol(warningsBitMask);
      }
      default: {
        return [
          {
            type: TelemetryWarningType.warning,
            message: `Unknown protocol type: ${inverterWarningProtocolType}`,
            protocolType: TelemetryWarningProtocolType.unknown,
            bitKey: '',
          },
        ];
      }
    }
  }

  parseTelemetryWarnings(warnings: string): Array<parsedWarning> {
    if (!warnings) return [];
    const [inverterWarningProtocolTypeAndFailureFlag, warningsBitMask] =
      warnings.split(';');

    const [inverterWarningProtocolType] =
      inverterWarningProtocolTypeAndFailureFlag.split(',');

    return this.parseWarningsByProtocol(
      warningsBitMask,
      inverterWarningProtocolType,
    );
  }
}
