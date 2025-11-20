<<<<<<< HEAD
// src/auth/auth.service.ts
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from '../users/user.entity';
import { RoleEntity } from '../roles/role.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
=======
import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from '../users/users.entity';
import { RoleEntity } from '../roles/roles.entity';
>>>>>>> f541a4ea0df174faaed1aff827573eba9ff9e3a9

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly usersRepo: Repository<UserEntity>,
    @InjectRepository(RoleEntity) private readonly rolesRepo: Repository<RoleEntity>,
    private readonly jwt: JwtService,
  ) {}

<<<<<<< HEAD
  async register(dto: RegisterDto) {
    const exists = await this.usersRepo.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Email ya registrado');

    const password = await bcrypt.hash(dto.password, 10);
    let roles: RoleEntity[] = [];
    if (dto.roles?.length) {
      roles = await this.rolesRepo.find({ where: { role_name: In(dto.roles) } });
    }
    const user = this.usersRepo.create({ ...dto, password, roles });
    const saved = await this.usersRepo.save(user);
    return { message: 'Usuario registrado con éxito', userId: saved.id };
  }

  async login(dto: LoginDto) {
    const user = await this.usersRepo.findOne({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Credenciales incorrectas');
    const ok = await bcrypt.compare(dto.password, user.password);
    if (!ok) throw new UnauthorizedException('Credenciales incorrectas');
    if (!user.is_active) throw new HttpException('Cuenta bloqueada', HttpStatus.LOCKED); // 423 ✅

=======
  // POST /auth/register
  async register(dto: any) {
    const email = dto.email?.toLowerCase?.();
    const name  = dto.name ?? '';
    const phone = dto.phone ?? null;
    const plain = dto.password ?? '';

    if (!email || !plain || !name) {
      throw new BadRequestException('Datos incompletos');
    }

    const exists = await this.usersRepo.findOne({ where: { email } });
    if (exists) throw new BadRequestException('El correo ya está registrado');

    const password = await bcrypt.hash(plain, 10);
    const user = this.usersRepo.create({
      email,
      password,
      name,
      phone,
      isActive: true,
      roles: [],
    });

    await this.usersRepo.save(user);
    return { message: 'Usuario registrado con éxito', userId: user.id };
  }

  // Usado por LocalStrategy y también por login directo
  async validateUser(email: string, plainPass: string) {
    const qb = this.usersRepo
      .createQueryBuilder('u')
      .addSelect('u.password')
      .leftJoinAndSelect('u.roles', 'r')
      .where('u.email = :email', { email: email?.toLowerCase() });

    const user = await qb.getOne();
    if (!user) return null;

    const ok = await bcrypt.compare(plainPass ?? '', user.password);
    if (!ok || !user.isActive) return null;

    delete (user as any).password;
    return user;
  }

  // POST /auth/login
  async login(dto: any) {
    if (dto?.user?.id) {
      const u = dto.user;
      const payload = {
        sub: u.id,
        email: u.email,
        roles: (u.roles ?? []).map((r: any) => r.roleName),
      };
      return { access_token: await this.jwt.signAsync(payload) };
    }

    const user = await this.validateUser(dto.email, dto.password);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');
>>>>>>> f541a4ea0df174faaed1aff827573eba9ff9e3a9

    const payload = {
      sub: user.id,
      email: user.email,
<<<<<<< HEAD
      roles: user.roles.map(r => r.role_name),
      is_active: user.is_active,
=======
      roles: (user.roles ?? []).map((r: any) => r.roleName),
>>>>>>> f541a4ea0df174faaed1aff827573eba9ff9e3a9
    };
    return { access_token: await this.jwt.signAsync(payload) };
  }
}
