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

  @Column()
  pdf: string;  

}
