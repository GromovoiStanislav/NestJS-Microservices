import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { RmqModule } from "@app/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";

@Module({
  imports: [
    RmqModule.register({
      name: "BILLING"
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "./apps/main/.env",
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_BILLING_QUEUE: Joi.string().required(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {
}
