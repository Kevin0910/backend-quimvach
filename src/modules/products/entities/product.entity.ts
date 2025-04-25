import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

}