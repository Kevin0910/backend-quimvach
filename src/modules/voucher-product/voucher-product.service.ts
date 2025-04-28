import { Injectable } from '@nestjs/common';
import { CreateVoucherProductDto } from './dto/create-voucher-product.dto';
import { UpdateVoucherProductDto } from './dto/update-voucher-product.dto';

@Injectable()
export class VoucherProductService {
  create(createVoucherProductDto: CreateVoucherProductDto) {
    return 'This action adds a new voucherProduct';
  }

  findAll() {
    return `This action returns all voucherProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} voucherProduct`;
  }

  update(id: number, updateVoucherProductDto: UpdateVoucherProductDto) {
    return `This action updates a #${id} voucherProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} voucherProduct`;
  }
}
