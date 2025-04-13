import { Module } from '@nestjs/common';
import { PurchaseOrdersService } from './purchase-orders.service';
import { PurchaseOrdersController } from './purchase-orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { PurchasedProduct } from '../purchased-products/entities/purchased-product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PurchaseOrder]),
    TypeOrmModule.forFeature([PurchasedProduct]),
  ],
  controllers: [PurchaseOrdersController],
  providers: [PurchaseOrdersService],
  exports: [PurchaseOrdersService],
})
export class PurchaseOrdersModule {}
