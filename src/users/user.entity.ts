// src/users/user.entity.ts
import {
  Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { RoleEntity } from '../roles/role.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @ManyToMany(() => RoleEntity, (role) => role.users, { eager: true })
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: RoleEntity[];
}
