import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { AppointmentEntity } from './appointment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentEntity])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [TypeOrmModule, AppointmentsService],
})
export class AppointmentsModule {}
