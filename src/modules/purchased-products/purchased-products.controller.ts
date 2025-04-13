import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PurchasedProductsService } from './purchased-products.service';
import { CreatePurchasedProductDto } from './dto/create-purchased-product.dto';
import { UpdatePurchasedProductDto } from './dto/update-purchased-product.dto';

@Controller('purchased-products')
export class PurchasedProductsController {
  constructor(private readonly purchasedProductsService: PurchasedProductsService) {}

  @Post()
  create(@Body() createPurchasedProductDto: CreatePurchasedProductDto) {
    return this.purchasedProductsService.create(createPurchasedProductDto);
  }

  @Get()
  findAll() {
    return this.purchasedProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchasedProductsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurchasedProductDto: UpdatePurchasedProductDto) {
    return this.purchasedProductsService.update(+id, updatePurchasedProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchasedProductsService.remove(+id);
  }
}
