import { join } from 'path';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

// NB: BEFORE IMPORT MODULES ONLY!
dotenv.config({ path: join(process.cwd(), '.env') });

import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['warn', 'error'],
  });

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: process.env.NODE_ENV !== 'production',
    }),
  );

  app.connectMicroservice({
    transport: Transport.MQTT,
    options: {
      url: process.env.MQTT_URL,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3003);
}

bootstrap();
