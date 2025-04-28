import { Module } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { VoucherController } from './voucher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voucher } from './entities/voucher.entity';
import { Product } from '../products/entities/product.entity';
import { VoucherProduct } from '../voucher-product/entities/voucher-product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Voucher ]),
    TypeOrmModule.forFeature([ Product ]),
    TypeOrmModule.forFeature([ VoucherProduct ]),
  ],
  controllers: [VoucherController],
  providers: [VoucherService],
  exports: [VoucherService],
})
export class VoucherModule {}
