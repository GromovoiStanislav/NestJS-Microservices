import { Body, Controller, Get, Inject, Logger, OnModuleInit, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { ClientKafka, MessagePattern, Payload } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Controller()
export class AppController implements OnModuleInit {

  constructor(
    private readonly appService: AppService,
    @Inject("KAFKA") private readonly kafka: ClientKafka
  ) {
  }

  async onModuleInit() {
    await this.kafka.connect();
  }

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Post("/")
  sendMessage(
    @Body("message") message: string,
    @Body("user") user: string
  ) {
    return firstValueFrom(
      this.kafka.emit("GET_USERS", {
        message,
        user
      })
    );
  }

  @MessagePattern("GET_USERS")
  GetUsers(@Payload() payload: Record<string, unknown>) {
    Logger.log("GET_USERS", AppController.name);

    return this.kafka.emit("PRINT_USERS", {
      message: payload.message,
      user: payload.user
    });
  }

  @MessagePattern("PRINT_USERS")
  PrintUsers(@Payload() payload: any) {
    Logger.log("PRINT_USERS", AppController.name);

    console.log({
      message: payload.message,
      user: payload.user
    });
  }

}