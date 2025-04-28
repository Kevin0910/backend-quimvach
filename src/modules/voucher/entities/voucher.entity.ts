import { Product } from "src/modules/products/entities/product.entity";
import { VoucherProduct } from "src/modules/voucher-product/entities/voucher-product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('voucher')
export class Voucher {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  folio: string;

  @Column()
  departamentRequested: string;

  @Column()
  nameRequested: string;

  @Column({ default: 'Pendiente' })
  status: string

  @Column( { type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateCreated: Date;

  @Column( { type: 'timestamp', nullable: true })
  expirationDate: Date;

  @Column()
  pdf: string;

  @OneToMany(() => VoucherProduct, (vp) => vp.voucher)
  voucherProducts: VoucherProduct[];
}
