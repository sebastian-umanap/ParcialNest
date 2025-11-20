import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import type { AppointmentStatus } from '../appointment.entity';

export class UpdateAppointmentDto {
  @IsOptional()
  @IsDateString()
  datetime?: string;

  @IsOptional()
  @IsEnum(['done', 'cancelled'] as const)
  status?: AppointmentStatus;
}
