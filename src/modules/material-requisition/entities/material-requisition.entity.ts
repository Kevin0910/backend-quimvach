import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("material_requisition")
export class MaterialRequisition {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  folio: string;

  @Column()
  numberRequisition: string;

  @Column()
  departament: string;

  @Column()
  pdf: string;

  @Column({ default: 'Pendiente'})
  status: string;

  @Column({ nullable: true })
  comment: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  dateCreated: Date;

}
 