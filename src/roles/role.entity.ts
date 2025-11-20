import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../users/users.entity';

@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'role_name', unique: true })
  roleName: string;          // 👈 propiedad es roleName

  @Column({ nullable: true })
  description?: string;

  @ManyToMany(() => UserEntity, (u) => u.roles)
  users: UserEntity[];
}
