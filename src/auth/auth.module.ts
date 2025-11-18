// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserEntity } from '../users/user.entity';
import { RoleEntity } from '../roles/role.entity';

const expiresIn =  '120'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
    JwtModule.register({
      secret: 'super_secreto_local',
      signOptions: { expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
