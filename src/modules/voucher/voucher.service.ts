import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Voucher } from './entities/voucher.entity';
import { Product } from '../products/entities/product.entity';
import { VoucherProduct } from '../voucher-product/entities/voucher-product.entity';
import { addDays } from 'date-fns';
import { UpdateVoucherDto } from './dto/update-voucher.dto';

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

  async createVoucher(data: CreateVoucherDto, pdf: Express.Multer.File) {
    let products: { id: string; quantity: number }[];

    try {
      products = typeof data.products === 'string' ? JSON.parse(data.products) : data.products;
    } catch (error) {
      throw new BadRequestException('Formato de productos inválido');
    }

    const nowDate = new Date();
    const expirationDate = addDays(nowDate, 3);
  
    const voucher = this.voucherRepository.create({
      ...data,
      pdf: pdf.filename,
      dateCreated: nowDate,
      expirationDate: expirationDate,
    });
  
    await this.voucherRepository.save(voucher);
  
    for (const item of products) {
      const product = await this.productRepository.findOne({
        where: { id: item.id },
      });

      const quantity = Number(item.quantity);

      if (isNaN(quantity) || quantity <= 0) {
        throw new BadRequestException(`Cantidad inválida para el producto ${item.id}`);
      }
  
      if (!product) {
        throw new NotFoundException(`Producto con ID ${item.id} no encontrado`);
      }
  
      if (product.stock < quantity) {
        throw new BadRequestException(`Stock insuficiente para el producto ${product.name}`);
      }
  
      product.stock -= quantity;
      await this.productRepository.save(product);
  
      const voucherProduct = this.voucherProductRepository.create({
        voucher,
        product,
        quantity,
      });
  
      await this.voucherProductRepository.save(voucherProduct);
    }
  
    return voucher;
  }  

  async findAll() {
    const vouchers = await this.voucherRepository.find({
      relations: ['voucherProducts', 'voucherProducts.product'],
    });
  
    const now = new Date();
  
    for (const voucher of vouchers) {
      const created = new Date(voucher.dateCreated);
      const diffMs = now.getTime() - created.getTime();
      const diffDays = diffMs / (1000 * 60 * 60 * 24);
  
      if (diffDays >= 3 && voucher.status !== 'Atrasado') {
        voucher.status = 'Atrasado';
        await this.voucherRepository.save(voucher);
      }
    }
  
    return vouchers;
  }

  async findOneVoucher(id: string) {
    const voucher = await this.voucherRepository.findOne({
      where: { id },
      relations: ['voucherProducts', 'voucherProducts.product'],
    });
    if (!voucher) {
      throw new NotFoundException(`Voucher con ID ${id} no encontrado`);
    }
    return voucher;
  }

  updateVoucher(id: string, data: UpdateVoucherDto) {
    return this.voucherRepository.update(id, data).then((result) => {
      if (result.affected === 0) {
        throw new NotFoundException(`Voucher con ID ${id} no encontrado`);
      }
      return this.voucherRepository.findOne({ where: { id } });
    });
  }

  async confirmDelivery(id: string, voucherProducts: any[]) {
    const voucher = await this.voucherRepository.findOne({ where: { id }, relations: ['voucherProducts', 'voucherProducts.product'] });

    if (!voucher) {
      throw new NotFoundException('Voucher no encontrado');
    }

    voucher.status = 'Entregado';
    await this.voucherRepository.save(voucher);

    for (const vp of voucherProducts) {
      const product = await this.productRepository.findOne({ where: { id: vp.product.id } });
      if (product) {
        product.stock += vp.quantity;
        await this.productRepository.save(product);
      }
    }

    return 
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
