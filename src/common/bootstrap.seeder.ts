/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from '../users/users.entity';
import { RoleEntity } from '../roles/roles.entity';

@Injectable()
export class BootstrapSeeder implements OnApplicationBootstrap {
  private readonly logger = new Logger(BootstrapSeeder.name);

  constructor(
    @InjectRepository(UserEntity) private readonly usersRepo: Repository<UserEntity>,
    @InjectRepository(RoleEntity) private readonly rolesRepo: Repository<RoleEntity>,
  ) {}

  async onApplicationBootstrap() {
    const baseRoles = ['admin', 'user'];
    const existing = await this.rolesRepo.find({ where: { roleName: In(baseRoles) } });
    const missing = baseRoles.filter(r => !existing.some(e => e.roleName === r));

    if (missing.length) {
      await this.rolesRepo.save(missing.map(r => this.rolesRepo.create({ roleName: r })));
      this.logger.log(`Roles creados: ${missing.join(', ')}`);
    }

    const email = 'admin@demo.com';
    const name  = 'Admin Demo';
    const plain = 'Secreta123';

    let admin = await this.usersRepo.findOne({ where: { email }, relations: ['roles'] });
    if (!admin) {
      const password = await bcrypt.hash(plain, 10);
      admin = this.usersRepo.create({ email, password, name, isActive: true });
      await this.usersRepo.save(admin);
      this.logger.log(`Usuario admin creado: ${email}`);
    }

    const adminRole = await this.rolesRepo.findOne({ where: { roleName: 'admin' } });
    if (adminRole && !(admin.roles ?? []).some(r => r.roleName === 'admin')) {
      admin.roles = [...(admin.roles ?? []), adminRole];
      await this.usersRepo.save(admin);
      this.logger.log(`Rol 'admin' asignado a ${email}`);
    }
  }
}
