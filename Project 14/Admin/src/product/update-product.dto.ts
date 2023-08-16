import { IsString, IsOptional, IsEmpty } from "class-validator";

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsEmpty()
  likes?: number;
}