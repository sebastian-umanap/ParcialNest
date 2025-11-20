import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
<<<<<<< HEAD
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './users/user.entity';
import { RoleEntity } from './roles/role.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: "localhost",
        port: 5433,
        username: "postgres",
        password: "1234",
        database: "parcial",
        synchronize: true,
        logging: true,
        entities: [UserEntity, RoleEntity],
      }),
=======

import { UserEntity } from './users/users.entity';
import { RoleEntity } from './roles/roles.entity';


import { APP_GUARD } from '@nestjs/core';

import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';

import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'parcial',
      entities: [UserEntity, RoleEntity],
      synchronize: true,

>>>>>>> f541a4ea0df174faaed1aff827573eba9ff9e3a9
    }),
    UsersModule,
    RolesModule,
    AuthModule,
  ],
<<<<<<< HEAD
=======
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
>>>>>>> f541a4ea0df174faaed1aff827573eba9ff9e3a9
})
export class AppModule {}
