import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserEntity } from './users.entity';
import { RoleEntity } from '../roles/roles.entity';

type SafeUser = {
  id: string;
  email: string;
  name: string;
  phone?: string | null;
  isActive: boolean;
  createdAt: Date;
  roles: string[];
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private readonly usersRepo: Repository<UserEntity>,
    @InjectRepository(RoleEntity) private readonly rolesRepo: Repository<RoleEntity>,
  ) {}

  private toSafe(u: UserEntity): SafeUser {
    return {
      id: u.id,
      email: u.email,
      name: u.name,
      phone: u.phone ?? null,
      isActive: u.isActive,
      createdAt: u.createdAt,
      roles: (u.roles ?? []).map(r => r.roleName),
    };
  }

  // GET /users/me
  async me(userId: string) {
    if (!userId) throw new BadRequestException('userId requerido');
    const user = await this.usersRepo.findOne({ where: { id: userId }, relations: ['roles'] });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return this.toSafe(user);
  }

  // GET /users (admin)
  async list() {
    const users = await this.usersRepo.find({ relations: ['roles'] });
    return users.map(u => this.toSafe(u));
  }

  // PATCH /users/:id/roles (admin)
  async assignRoles(userId: string, roleNames: string[]) {
    if (!userId) throw new BadRequestException('userId requerido');
    if (!Array.isArray(roleNames) || roleNames.length === 0) {
      throw new BadRequestException('roles no puede estar vacío');
    }

    const names = roleNames.map(s => String(s).trim().toLowerCase());
    const user = await this.usersRepo.findOne({ where: { id: userId }, relations: ['roles'] });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const roles = await this.rolesRepo.find({ where: { roleName: In(names) } });
    const missing = names.filter(n => !roles.some(r => r.roleName === n));
    if (missing.length) throw new NotFoundException(`Roles no encontrados: ${missing.join(', ')}`);

    user.roles = roles;
    await this.usersRepo.save(user);
    return { message: 'Roles asignados', user: this.toSafe(user) };
  }
}
