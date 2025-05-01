import { IsNumber, IsString } from "class-validator";

export class CreatePurchasedProductDto {
  @IsString()
  name: string;
  
  @IsString()
  description: string;
  
  @IsNumber()
  amount: number;

  @IsNumber()
  unit: number;

  @IsNumber()
  total: number;
}
