// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
<<<<<<< HEAD
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserEntity } from '../users/user.entity';
import { RoleEntity } from '../roles/role.entity';

const expiresIn =  '120'
=======
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserEntity } from '../users/users.entity';
import { RoleEntity } from '../roles/roles.entity';

const expiresIn = parseInt(process.env.JWT_EXPIRES_IN ?? '120', 10);
>>>>>>> f541a4ea0df174faaed1aff827573eba9ff9e3a9

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
<<<<<<< HEAD
    JwtModule.register({
      secret: 'super_secreto_local',
      signOptions: { expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
=======
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({ secret: process.env.JWT_SECRET ?? 'secreto', signOptions: { expiresIn } }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, PassportModule, JwtModule],
>>>>>>> f541a4ea0df174faaed1aff827573eba9ff9e3a9
})
export class AuthModule {}
