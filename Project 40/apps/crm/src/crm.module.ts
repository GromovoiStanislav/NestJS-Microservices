import { Module } from "@nestjs/common";
import { CrmController } from "./crm.controller";

@Module({
  imports: [],
  controllers: [CrmController],
  providers: [],
})
export class CrmModule {}
