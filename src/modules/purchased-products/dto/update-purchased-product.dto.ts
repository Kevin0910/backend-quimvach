import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchasedProductDto } from './create-purchased-product.dto';

export class UpdatePurchasedProductDto extends PartialType(CreatePurchasedProductDto) {}
