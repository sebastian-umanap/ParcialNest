// src/roles/roles.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './role.entity';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(RoleEntity) private readonly repo: Repository<RoleEntity>) {}

  async create(dto: CreateRoleDto) {
    if (!dto.role_name) throw new ConflictException('role_name es requerido');
    const exists = await this.repo.findOne({ where: { role_name: dto.role_name } });
    if (exists) throw new ConflictException('role_name ya existe');
    const r = this.repo.create(dto);
    const saved = await this.repo.save(r);
    return { message: 'Rol creado con éxito', roleId: saved.id };
  }

  async findAll() {
    return this.repo.find();
  }
}
