import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './users/users.entity';
import { RoleEntity } from './roles/roles.entity';


import { APP_GUARD } from '@nestjs/core';

import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';

import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { BootstrapSeeder } from './common/bootstrap.seeder'; // 👈


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // solo carga .env, no se inyecta cfg
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USER ?? 'postgres',
      password: process.env.DB_PASS ?? '1234',
      database: process.env.DB_NAME ?? 'parcial',
      entities: [UserEntity, RoleEntity],
      synchronize: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
  ],
  providers: [
    BootstrapSeeder,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
