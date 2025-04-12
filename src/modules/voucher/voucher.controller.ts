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
  @UseInterceptors(FileInterceptor('pdf', {
    storage: diskStorage({
      destination: './uploads/pdfs',
      filename: (req, file, callback) => {
        const fileExt = path.extname(file.originalname);
        const filename = `${Date.now()}${fileExt}`;
        callback(null, filename);
      }
    })
  }))
  create(@Body() createVoucherDto: CreateVoucherDto, @UploadedFile() pdf: Express.Multer.File) {
    return this.voucherService.create(createVoucherDto, pdf);
  }

  @Get('find-all')
  findAll() {
    return this.voucherService.findAll();
  }

  @Get('find-status/:status')
  findStatu(@Param('status') status: string) {
    return this.voucherService.findStatu(status);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVoucherDto: UpdateVoucherDto) {
    return this.voucherService.update(+id, updateVoucherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.voucherService.remove(+id);
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
