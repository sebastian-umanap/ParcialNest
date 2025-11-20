// src/roles/roles.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
<<<<<<< HEAD
import { RoleEntity } from './role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
=======
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { RoleEntity } from './roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  controllers: [RolesController],
  providers: [RolesService],
>>>>>>> f541a4ea0df174faaed1aff827573eba9ff9e3a9
  exports: [TypeOrmModule],
})
export class RolesModule {}
