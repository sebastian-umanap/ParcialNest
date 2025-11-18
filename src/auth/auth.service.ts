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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly usersRepo: Repository<UserEntity>,
    @InjectRepository(RoleEntity) private readonly rolesRepo: Repository<RoleEntity>,
    private readonly jwt: JwtService,
  ) {}

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


    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles.map(r => r.role_name),
      is_active: user.is_active,
    };
    return { access_token: await this.jwt.signAsync(payload) };
  }
}
