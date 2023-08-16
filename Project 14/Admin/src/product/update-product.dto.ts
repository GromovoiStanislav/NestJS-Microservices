import { IsString, IsNotEmpty, IsEmpty } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsEmpty()
  likes: number;
}