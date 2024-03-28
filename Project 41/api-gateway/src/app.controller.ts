import {Controller, Get, Inject, ñ} from "@nestjs/common";
import {AppService} from "./app.service";
import {ClientKafka} from "@nestjs/microservices";

@Controller()
export class AppController implements OnModuleInit {

    constructor(
        private readonly appService: AppService,
        @Inject("api_gateway_app") private readonly client: ClientKafka
    ) {
    }

    async onModuleInit() {
        await this.client.connect();
    }


    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get("kafka-test")
    testKafka() {
        const msg = {
            item_01: "here is a test val",
            rand: Math.floor(Math.random() * 1000),
            date: new Date().toString()
        };
        return this.client.emit("topic_01", msg);
    }
}