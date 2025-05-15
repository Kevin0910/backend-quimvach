import { PurchasedProduct } from "src/modules/purchased-products/entities/purchased-product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('purchase_orders')
export class PurchaseOrder {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  version: string;

  @Column( { type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateCreated: Date;

  @Column({ name: 'issue_date' })
  issueDate: string;
  
  @Column()
  date: string;

  @Column()
  oc: string;

  // QUIMVACH
  @Column()
  departamentQuimvach: string;
  
  @Column()
  directionQuimvach: string;

  @Column()
  cityQuimvach: string;

  @Column() 
  phoneQuimvach: string;

  @Column()
  emailQuimvach: string;
  
  // Proveedor
  @Column()
  nameSupplierCompany: string;

  @Column()
  supplierDepartament: string;

  @Column()
  supplierAddress: string;

  @Column()
  supplierCity: string;

  @Column()
  supplierPhone: string;

  @Column()
  supplierEmail: string;

  // Entrega de material
  @Column()
  recipientName: string;

  @Column()
  recipientPosition: string;

  @Column()
  deliveryLocation: string;

  @Column()
  deliveryContact: string;

  // Requisión
  @Column()
  numberRequisition: string;

  @Column()
  branchName: string;

  @Column()
  quoteNumber: string;

  @Column()
  conditionOfPayment: string;

  @Column( { nullable: true } )
  comment: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  subtotal: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  tax: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  shipment: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  others: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  total: number;

  @OneToMany(() => PurchasedProduct, product => product.purchaseOrder, { cascade: true })
  products: PurchasedProduct[];

}
