import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('material_request')
export class MaterialRequest {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  folio: string;

  @Column( { type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateCreated: Date;
  
  @Column()
  departamentRequested: string;
  
  @Column()
  nameRequested: string;

  @Column()
  pdf: string;
  
  @Column({ default: 'Pendiente' })
  status: string;

}
