import { Module } from '@nestjs/common';
import { PurchasedProductsService } from './purchased-products.service';
import { PurchasedProductsController } from './purchased-products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchasedProduct } from './entities/purchased-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PurchasedProduct])],
  controllers: [PurchasedProductsController],
  providers: [PurchasedProductsService],
  exports: [PurchasedProductsService],
})
export class PurchasedProductsModule {}
