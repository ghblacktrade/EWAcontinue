import { Controller, Logger } from '@nestjs/common';

import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { validateOrReject } from 'class-validator';

import { TelemetryTopicEntity } from './entity/topic/telemetry.topic.entity';
import { TelemetryService } from './telemetry.service';

@Controller('telemetry')
export class TelemetryController {
  private readonly logger = new Logger(TelemetryController.name);

  constructor(private readonly telemetryService: TelemetryService) {}

  @MessagePattern('+')
  async telemetryTopic(
    @Payload()
    data: TelemetryTopicEntity,
    @Ctx() context: MqttContext,
  ) {
    const topicName = context.getTopic();
    if (!topicName.startsWith('telemetry')) {
      return;
    }
    this.logger.debug(`Got a message in topic: ${topicName}`);

    const validator = this.telemetryService.constructTelemetryValidator(data);
    await validateOrReject(validator);

    const controlPcbCode = topicName.slice('telemetry_'.length);

    const { id: controlPcbId, timeZone } =
      await this.telemetryService.findControlPcb(controlPcbCode);

    await this.telemetryService.createTelemetry(controlPcbId, data, timeZone);

    this.logger.debug(`Finished processing telemetry for topic: ${topicName}`);
  }
}
