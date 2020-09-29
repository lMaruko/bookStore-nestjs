import { type } from 'os';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

//singular para los modelos , plural para la base de datos
@Entity('roles')
export class Rol extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ type: 'text', nullable: false })
  name: string;
  @Column({ type: 'text', nullable: false })
  description: string;
  @ManyToMany(
    type => User,
    user => user.roles,
  )
  @JoinColumn({ name: 'role_user' })
  users: User[];
  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status: string;
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
