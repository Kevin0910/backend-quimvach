import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Voucher } from './entities/voucher.entity';
import { Product } from '../products/entities/product.entity';
import { VoucherProduct } from '../voucher-product/entities/voucher-product.entity';
import { addDays } from 'date-fns';

@Injectable()
export class VoucherService {

  constructor(
    @InjectRepository(Voucher)
    private voucherRepository: Repository<Voucher>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(VoucherProduct)
    private voucherProductRepository: Repository<VoucherProduct>,
  ) {}

  async createVoucher(data: CreateVoucherDto) {
    const { folio, departamentRequested, nameRequested, pdf, products } = data;
  
    const nowDate = new Date();
    const expirationDate = addDays(nowDate, 3);
  
    const voucher = this.voucherRepository.create({
      folio,
      departamentRequested,
      nameRequested,
      pdf,
      dateCreated: nowDate,
      expirationDate: expirationDate,
    });
  
    await this.voucherRepository.save(voucher);
  
    for (const item of products) {
      const product = await this.productRepository.findOne({
        where: { id: item.id },
      });
  
      if (!product) {
        throw new NotFoundException(`Producto con ID ${item.id} no encontrado`);
      }
  
      if (product.stock < item.quantity) {
        throw new BadRequestException(`Stock insuficiente para el producto ${product.name}`);
      }
  
      product.stock -= item.quantity;
      await this.productRepository.save(product);
  
      const voucherProduct = this.voucherProductRepository.create({
        voucher: voucher,
        product: product,
        quantity: item.quantity,
      });
  
      await this.voucherProductRepository.save(voucherProduct);
    }
  
    return voucher;
  }  

  async findAll() {
    return this.voucherRepository.find({
      relations: ['voucherProducts', 'voucherProducts.product'],
    });
  }

  async findOne(id: string) {
    const voucher = await this.voucherRepository.findOne({
      where: { id },
      relations: ['voucherProducts', 'voucherProducts.product'],
    });
    if (!voucher) {
      throw new NotFoundException(`Voucher con ID ${id} no encontrado`);
    }
    return voucher;
  }

  async deleteVoucher(id: string) {
    const voucher = await this.voucherRepository.findOne({
      where: { id },
      relations: ['voucherProducts', 'voucherProducts.product'],
    });
  
    if (!voucher) {
      throw new NotFoundException(`Voucher con ID ${id} no encontrado`);
    }
  
    for (const voucherProduct of voucher.voucherProducts) {
      const product = voucherProduct.product;
      product.stock += voucherProduct.quantity;
      await this.productRepository.save(product);
  
      await this.voucherProductRepository.delete(voucherProduct.id);
    }
  
    await this.voucherRepository.delete(id);  
    return { message: 'Voucher eliminado y stock devuelto exitosamente' };
  }

}
