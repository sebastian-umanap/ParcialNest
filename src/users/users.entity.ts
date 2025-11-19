import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  ManyToMany, JoinTable, Index
} from 'typeorm';
import { RoleEntity } from '../roles/roles.entity';

@Entity('users')
@Index('UQ_users_email', ['email'], { unique: true })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 180, unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ length: 180 })
  name: string;

  @Column({ length: 50, nullable: true })
  phone?: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'now()' })
  createdAt: Date;

  @ManyToMany(() => RoleEntity, (role) => role.users, { eager: true })
  @JoinTable({
    name: 'users_roles',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles: RoleEntity[];
}
