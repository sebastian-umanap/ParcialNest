import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
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
    }),
    UsersModule,
    RolesModule,
    AuthModule,
  ],
})
export class AppModule {}
