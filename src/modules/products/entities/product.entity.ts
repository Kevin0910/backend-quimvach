import { VoucherProduct } from "src/modules/voucher-product/entities/voucher-product.entity";
import { Voucher } from "src/modules/voucher/entities/voucher.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Product {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: true })
  sku: string;

  @Column()
  name: string;

  @Column()
  stock: number;

  @OneToMany(() => VoucherProduct, (vp) => vp.product)
  voucherProducts: VoucherProduct[];

}