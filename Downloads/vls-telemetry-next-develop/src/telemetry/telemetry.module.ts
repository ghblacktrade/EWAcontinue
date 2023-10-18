import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';

import { PrismaModule } from '../prisma/prisma.module';

import { TelemetryWarningModule } from '../telemetry-warning/telemetry-warning.module';

import { TelemetryController } from './telemetry.controller';

import { TelemetryService } from './telemetry.service';

import { NotifyModule } from 'src/notify/notify.module';

@Module({
  imports: [
    PrismaModule,
    TelemetryWarningModule,
    NotifyModule,
    CacheModule.register({
      ttl: 24 * 60 * 1000, // 24h
      max: 1000,
    }),
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: process.env.MQTT_URL,
        },
      },
    ]),
  ],
  providers: [TelemetryService],
  controllers: [TelemetryController],
  exports: [TelemetryService],
})
export class TelemetryModule {}
