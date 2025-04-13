import { Injectable } from '@nestjs/common';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PurchaseOrdersService {
  
  constructor(
    @InjectRepository(PurchaseOrder)
    private purchaseOrderRepository: Repository<PurchaseOrder>,
  ) {}

  async create(createPurchaseOrderDto: CreatePurchaseOrderDto): Promise<PurchaseOrder> {
    const newOrder = this.purchaseOrderRepository.create(createPurchaseOrderDto);
    return await this.purchaseOrderRepository.save(newOrder);
  }

  async findAll(): Promise<PurchaseOrder[]> {
    return this.purchaseOrderRepository.find({ relations: ['products'] });
  }

  async findOne(id: string): Promise<PurchaseOrder> {
    const purchaseOrder = await this.purchaseOrderRepository.findOne({ where: { id }, relations: ['products'] });
    if (!purchaseOrder) {
      throw new Error(`PurchaseOrder with id ${id} not found`);
    }
    return purchaseOrder;
  }

}
