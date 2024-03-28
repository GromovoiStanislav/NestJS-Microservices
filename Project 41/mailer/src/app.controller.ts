import {Controller, Get} from '@nestjs/common';
import {Ctx, KafkaContext, MessagePattern, Payload} from "@nestjs/microservices";

@Controller()
export class AppController {

    @MessagePattern("topic_01")
    readMessage(@Payload() message: any, @Ctx() context: KafkaContext) {
        const originalMessage = context.getMessage();
        const response = `Receiving a new message from topic: topic_01: ` + JSON.stringify(originalMessage.value);
        console.log(response);
        return response;
    }

}
