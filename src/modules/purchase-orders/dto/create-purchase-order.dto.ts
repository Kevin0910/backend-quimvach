import { IsString, IsEmail, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePurchasedProductDto } from 'src/modules/purchased-products/dto/create-purchased-product.dto';

export class CreatePurchaseOrderDto {

  @IsString()
  departament: string;

  @IsString()
  direction: string;

  @IsString()
  city: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  supplierName: string;

  @IsString()
  departamentName: string;

  @IsString()
  supplierAddress: string;

  @IsString()
  supplierPhone: string;

  @IsEmail()
  supplierEmail: string;

  @IsString()
  numberRequisition: string;

  @IsString()
  branchName: string;

  @IsString()
  quoteNumber: string;

  @IsString()
  conditionOfPayment: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePurchasedProductDto)
  products: CreatePurchasedProductDto[];

}
