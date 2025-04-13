import { Injectable } from '@nestjs/common';
import { CreatePurchasedProductDto } from './dto/create-purchased-product.dto';
import { UpdatePurchasedProductDto } from './dto/update-purchased-product.dto';

@Injectable()
export class PurchasedProductsService {
  create(createPurchasedProductDto: CreatePurchasedProductDto) {
    return 'This action adds a new purchasedProduct';
  }

  findAll() {
    return `This action returns all purchasedProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchasedProduct`;
  }

  update(id: number, updatePurchasedProductDto: UpdatePurchasedProductDto) {
    return `This action updates a #${id} purchasedProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchasedProduct`;
  }
}
