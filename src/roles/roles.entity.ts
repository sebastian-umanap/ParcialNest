import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, Index } from 'typeorm';
import { UserEntity } from '../users/users.entity';

@Entity('roles')
@Index('UQ_roles_role_name', ['roleName'], { unique: true })
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'role_name', length: 64, unique: true })
  roleName: string;

  @Column({ nullable: true, length: 255 })
  description?: string;

  @ManyToMany(() => UserEntity, (u) => u.roles)
  users: UserEntity[];
}
