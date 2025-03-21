import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  stock: number;

  @Column({ nullable: true })
  numero_serie?: string;

  @Column({ nullable: true })
  barcode?: string;

  @Column({ nullable: true })
  qrCode?: string;

}