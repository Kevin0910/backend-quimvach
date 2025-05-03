import { IsString, IsEmail, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePurchasedProductDto } from 'src/modules/purchased-products/dto/create-purchased-product.dto';

export class CreatePurchaseOrderDto {

  code: string;
  
  version: string;

  issueDate: string;
  
  date: string;

  oc: string;

  // QUIMVACH
  departamentQuimvach: string;
  
  directionQuimvach: string;

  cityQuimvach: string;
  
  phoneQuimvach: string;

  emailQuimvach: string;
  
  // Proveedor
  nameSupplierCompany: string;

  supplierDepartament: string;

  supplierAddress: string;

  supplierCity: string;

  supplierPhone: string;

  supplierEmail: string;

  // Entrega de material
  recipientName: string;

  recipientPosition: string;

  deliveryLocation: string;

  deliveryContact: string;

  // Requisión
  numberRequisition: string;

  branchName: string;

  quoteNumber: string;

  conditionOfPayment: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePurchasedProductDto)
  products: CreatePurchasedProductDto[];

}
