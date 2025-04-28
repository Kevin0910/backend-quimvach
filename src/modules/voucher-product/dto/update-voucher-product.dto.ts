import { PartialType } from '@nestjs/mapped-types';
import { CreateVoucherProductDto } from './create-voucher-product.dto';

export class UpdateVoucherProductDto extends PartialType(CreateVoucherProductDto) {}
