<<<<<<< HEAD
// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { UserEntity } from './user.entity';
import { RoleEntity } from '../roles/role.entity';
=======

import { Injectable } from '@nestjs/common';
>>>>>>> f541a4ea0df174faaed1aff827573eba9ff9e3a9

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
<<<<<<< HEAD
  constructor(
    @InjectRepository(UserEntity) private readonly users: Repository<UserEntity>,
    @InjectRepository(RoleEntity) private readonly roles: Repository<RoleEntity>,
  ) {}

  async me(userId: string) {
    const u = await this.users.findOne({ where: { id: userId } });
    if (!u) throw new NotFoundException('Usuario no encontrado');
    return u;
  }

  async list() {
    return this.users.find();
  }

  async assignRoles(userId: string, roleNames: string[]) {
    const u = await this.users.findOne({ where: { id: userId } });
    if (!u) throw new NotFoundException('Usuario no encontrado');
    const r = await this.roles.find({ where: { role_name: In(roleNames) } });
    if (r.length !== roleNames.length) {
      throw new Error('roles inválidos');
    }
    u.roles = r;
    await this.users.save(u);
    return { message: 'Roles asignados' };
=======
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
>>>>>>> f541a4ea0df174faaed1aff827573eba9ff9e3a9
  }
}
