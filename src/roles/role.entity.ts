// src/roles/role.entity.ts
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../users/user.entity';

@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, name: 'role_name' })
  role_name: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity[];
}
