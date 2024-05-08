import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateOrderDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;
}

