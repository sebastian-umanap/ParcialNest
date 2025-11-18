// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from './user.entity';
import { RoleEntity } from '../roles/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])], // 👈 añade RoleEntity
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
