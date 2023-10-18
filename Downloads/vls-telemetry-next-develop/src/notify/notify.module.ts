import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';

import { NotifyService } from './notify.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'main',
    }),
    PrismaModule,
  ],
  providers: [NotifyService],
  exports: [NotifyService],
})
export class NotifyModule {}
