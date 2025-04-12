import { Module } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { VoucherController } from './voucher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voucher } from './entities/voucher.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Voucher ]),
    TypeOrmModule.forFeature([ Product ]),
  ],
  controllers: [VoucherController],
  providers: [VoucherService],
  exports: [VoucherService],
})
export class VoucherModule {}
