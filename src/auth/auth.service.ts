import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from '../users/users.entity';
import { RoleEntity } from '../roles/roles.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly usersRepo: Repository<UserEntity>,
    @InjectRepository(RoleEntity) private readonly rolesRepo: Repository<RoleEntity>,
    private readonly jwt: JwtService,
  ) {}

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

    const payload = {
      sub: user.id,
      email: user.email,
      roles: (user.roles ?? []).map((r: any) => r.roleName),
    };
    return { access_token: await this.jwt.signAsync(payload) };
  }
}
