import { Module } from '@nestjs/common';
import { MaterialRequestService } from './material-request.service';
import { MaterialRequestController } from './material-request.controller';
import { MaterialRequest } from './entities/material-request.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MaterialRequest])],
  controllers: [MaterialRequestController],
  providers: [MaterialRequestService],
})
export class MaterialRequestModule {}
