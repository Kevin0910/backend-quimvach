// voucher-product.entity.ts
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "src/modules/products/entities/product.entity";
import { Voucher } from "src/modules/voucher/entities/voucher.entity";

@Entity('voucher_product')
export class VoucherProduct {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Voucher, (voucher) => voucher.voucherProducts)
  voucher: Voucher;

  @ManyToOne(() => Product, (product) => product.voucherProducts)
  product: Product;

}
