import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PurchaseOrdersService } from './purchase-orders.service';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase-order.dto';

@Controller('purchase-order')
export class PurchaseOrdersController {

  constructor(
    private readonly purchaseOrderService: PurchaseOrdersService
  ) {}

  @Post('create')
  async create(@Body() createPurchaseOrderDto: CreatePurchaseOrderDto) {
    return await this.purchaseOrderService.create(createPurchaseOrderDto);
  }

  @Get('all')
  async findAll() {
    return await this.purchaseOrderService.findAll();
  }

  @Get('get/:id')
  async findOne(@Param('id') id: string) {
    return await this.purchaseOrderService.findOne(id);
  }

}
