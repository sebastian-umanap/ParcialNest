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
import { BootstrapSeeder } from './common/bootstrap.seeder'; 
import { AppointmentsModule } from './appointments/appointments.module';
import { AppointmentEntity } from './appointments/appointment.entity';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USER ?? 'postgres',
      password: process.env.DB_PASS ?? '1234',
      database: process.env.DB_NAME ?? 'parcial',
      entities: [UserEntity, RoleEntity, AppointmentEntity],
      synchronize: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    AppointmentsModule,
  ],
  providers: [
    BootstrapSeeder,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
