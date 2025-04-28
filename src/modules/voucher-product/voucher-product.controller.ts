import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VoucherProductService } from './voucher-product.service';
import { CreateVoucherProductDto } from './dto/create-voucher-product.dto';
import { UpdateVoucherProductDto } from './dto/update-voucher-product.dto';

@Controller('voucher-product')
export class VoucherProductController {
  constructor(private readonly voucherProductService: VoucherProductService) {}

  @Post()
  create(@Body() createVoucherProductDto: CreateVoucherProductDto) {
    return this.voucherProductService.create(createVoucherProductDto);
  }

  @Get()
  findAll() {
    return this.voucherProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.voucherProductService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVoucherProductDto: UpdateVoucherProductDto) {
    return this.voucherProductService.update(+id, updateVoucherProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.voucherProductService.remove(+id);
  }
}
