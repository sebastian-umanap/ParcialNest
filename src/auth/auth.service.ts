import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
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

    // valida datos mínimos y forma simple de email
    if (!email || !plain || !name) throw new BadRequestException('Datos incompletos');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new BadRequestException('Email inválido');

    const exists = await this.usersRepo.findOne({ where: { email } });
    if (exists) throw new ConflictException('Email ya registrado');

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

  // usado por LocalStrategy y también por login directo
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
    // flujo con LocalAuthGuard (req.user)
    if (dto?.user?.id) {
      const u = dto.user;
      const roles = (u.roles ?? []).map((r: any) => r.roleName); // ✅ define roles
      const payload = { sub: u.id, email: u.email, roles };
      const access_token = await this.jwt.signAsync(payload);
      return { access_token, user: { id: u.id, email: u.email, name: u.name, roles } };
    }

    // flujo directo (sin LocalAuthGuard)
    const user = await this.validateUser(dto.email, dto.password);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const roles = (user.roles ?? []).map((r: any) => r.roleName); // ✅ define roles
    const payload = { sub: user.id, email: user.email, roles };
    const access_token = await this.jwt.signAsync(payload);
    return { access_token, user: { id: user.id, email: user.email, name: user.name, roles } };
  }
}
