import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Voucher } from './entities/voucher.entity';
import * as multer from 'multer';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class VoucherService {

  constructor(
    @InjectRepository(Voucher)
    private voucherRepository: Repository<Voucher>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createVoucherDto: CreateVoucherDto, pdf: Express.Multer.File) {
    const voucher = this.voucherRepository.create({
      ...createVoucherDto,
      pdf: pdf.filename
    });

    return this.voucherRepository.save(voucher);
  }

  findAll() {
    return this.voucherRepository.find();
  }

  findStatu(status: string) {
    return this.voucherRepository.findOne({ where: { status } });
  }

  update(id: number, updateVoucherDto: UpdateVoucherDto) {
    return `This action updates a #${id} voucher`;
  }

  remove(id: number) {
    return `This action removes a #${id} voucher`;
  }
}
