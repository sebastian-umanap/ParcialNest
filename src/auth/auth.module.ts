// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserEntity } from '../users/users.entity';
import { RoleEntity } from '../roles/roles.entity';

const JWT_SECRET = (process.env.JWT_SECRET ?? 'dev-secret').trim();
const RAW_EXP = (process.env.JWT_EXPIRES_IN ?? '120s').trim().replace(/^['"]|['"]$/g, '');
type MsString = `${number}${'ms'|'s'|'m'|'h'|'d'|'w'|'y'}`;

const JWT_EXPIRES_IN: number | MsString =
  /^\d+$/.test(RAW_EXP) ? Number(RAW_EXP) : (RAW_EXP as MsString);

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, PassportModule, JwtModule],
})
export class AuthModule {}
