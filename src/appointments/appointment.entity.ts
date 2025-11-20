import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled';

@Entity('appointments')
export class AppointmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { name: 'id_user' })
  id_user: string;

  @Column('uuid', { name: 'id_doctor' })
  id_doctor: string;

  @Column({ type: 'timestamptz', name: 'datetime' })
  datetime: Date;

  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status: AppointmentStatus;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  created_at: Date;
}
