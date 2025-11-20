// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
<<<<<<< HEAD
import { UserEntity } from './user.entity';
import { RoleEntity } from '../roles/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])], // 👈 añade RoleEntity
=======
import { UserEntity } from './users.entity';
import { RoleEntity } from '../roles/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
>>>>>>> f541a4ea0df174faaed1aff827573eba9ff9e3a9
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
