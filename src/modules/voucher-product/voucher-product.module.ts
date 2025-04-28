import { Module } from '@nestjs/common';
import { VoucherProductService } from './voucher-product.service';
import { VoucherProductController } from './voucher-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoucherProduct } from './entities/voucher-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VoucherProduct])],
  controllers: [VoucherProductController],
  providers: [VoucherProductService],
  exports: [VoucherProductService],
})
export class VoucherProductModule {}
