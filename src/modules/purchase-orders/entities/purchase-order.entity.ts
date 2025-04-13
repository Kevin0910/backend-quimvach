import { PurchasedProduct } from "src/modules/purchased-products/entities/purchased-product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('purchase_orders')
export class PurchaseOrder {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  departament: string;
  
  @Column()
  direction: string;

  @Column()
  city: string;

  @Column() 
  phone: string;

  @Column()
  email: string;

  @Column()
  supplierName: string;

  @Column()
  departamentName: string;

  @Column()
  supplierAddress: string;

  @Column()
  supplierPhone: string;

  @Column()
  supplierEmail: string;

  @Column()
  numberRequisition: string;

  @Column()
  branchName: string;

  @Column()
  quoteNumber: string;

  @Column()
  conditionOfPayment: string;

  @OneToMany(() => PurchasedProduct, product => product.purchaseOrder, { cascade: true })
  products: PurchasedProduct[];

}
