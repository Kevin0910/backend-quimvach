import { Module } from '@nestjs/common';
import { MaterialRequisitionService } from './material-requisition.service';
import { MaterialRequisitionController } from './material-requisition.controller';
import { MaterialRequisition } from './entities/material-requisition.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MaterialRequisition]),
  ],
  controllers: [MaterialRequisitionController],
  providers: [MaterialRequisitionService],
  exports: [MaterialRequisitionService],
})
export class MaterialRequisitionModule {}
