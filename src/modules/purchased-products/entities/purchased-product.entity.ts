import { PurchaseOrder } from "src/modules/purchase-orders/entities/purchase-order.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('purchased_products')
export class PurchasedProduct {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;
  
  @Column()
  amount: number;

  @Column()
  total: number;

  @ManyToOne(() => PurchaseOrder, purchaseOrder => purchaseOrder.products, { onDelete: 'CASCADE' })
  purchaseOrder: PurchaseOrder;

}
