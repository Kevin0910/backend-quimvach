import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column({ unique: true })
  barcode: string;

  @Column({ unique: true, nullable: true })
  qrCode?: string;

}
