// src/roles/roles.service.ts
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './roles.entity';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly rolesRepo: Repository<RoleEntity>,
  ) {}

  async create(dto: CreateRoleDto) {
    const roleName = dto.role_name?.trim().toLowerCase();
    if (!roleName) throw new BadRequestException('role_name es requerido');

    // OJO: usa la propiedad de la entidad (roleName), no el nombre de columna
    const exists = await this.rolesRepo.findOne({ where: { roleName } });
    if (exists) throw new ConflictException('role_name ya existe');

    // description debe ser string o undefined (NO null)
    const description = dto.description?.trim() || undefined;

    const role = this.rolesRepo.create({
      roleName,
      description, // <- sin null
    });

    await this.rolesRepo.save(role);
    return { message: 'Rol creado con éxito', roleId: role.id };
  }

  async findAll() {
    return this.rolesRepo.find();
  }
}
