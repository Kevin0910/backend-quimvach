import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as path from 'path';

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Post('create')
  create(@Body() createVoucherDto: CreateVoucherDto) {
    return this.voucherService.createVoucher(createVoucherDto);
  }

  @Get('all-vouchers')
  findAll() {
    return this.voucherService.findAll();
  }

  @Get('find-by-id/:id')
  findOneVoucher(@Param('id') id: string) {
    return this.voucherService.findOneVoucher(id);
  }

  @Patch('update/:id')
  updateVoucher(@Param('id') id: string, @Body() updateVoucherDto: UpdateVoucherDto) {
    return this.voucherService.updateVoucher(id, updateVoucherDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.voucherService.deleteVoucher(id);
  }

}

function diskStorage(options: {
  destination: string;
  filename: (req: any, file: any, callback: (error: Error | null, filename: string) => void) => void;
}): multer.StorageEngine {
  return multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, options.destination);
    },
    filename: options.filename,
  });
}
