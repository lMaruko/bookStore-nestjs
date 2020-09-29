import { UserDetails } from './user.details.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Rol } from '../role/role.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
  username: string;
  @Column({ type: 'varchar', nullable: false })
  email: string;
  @Column({ type: 'varchar', nullable: false })
  password: string;
  @OneToOne(type => UserDetails, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'detail_id' })
  details: UserDetails;
  @ManyToMany(
    type => Rol,
    role => role.users,
    { eager: true },
  )
  @JoinTable({ name: 'user_roles' })
  roles: Rol[];
  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status: string;
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
