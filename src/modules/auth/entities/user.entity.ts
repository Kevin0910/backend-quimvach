import { Role } from "src/modules/roles/entities/role.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ name: 'last_name' })
  lastName: string;

  // @Column()
  // phone: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

//   @ManyToOne(() => Role, (role) => role.users)
//   role: Role;

  @Column("text", {
    array: true,
    default: ['empleado'], 
  })
  role: string[];

  @Column({ nullable: true }) 
  token?: string;

}
