import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentEntity } from './appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

type ReqUser = { id: string; email: string; roles: string[] };

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(AppointmentEntity)
    private readonly repo: Repository<AppointmentEntity>,
  ) {}

  private rolesOf(u?: any): string[] {
    return Array.isArray(u?.roles) ? u.roles.map((r: any) => String(r).toLowerCase()) : [];
  }
  private isAdmin(u?: any)  { return this.rolesOf(u).includes('admin'); }
  private isDoctor(u?: any) { return this.rolesOf(u).includes('doctor'); }

  async create(requester: ReqUser, id_user: string, id_doctor: string, dto: CreateAppointmentDto) {
    const reqId = requester?.id;
    const allowed =
      this.isAdmin(requester) ||
      reqId === id_user ||
      (this.isDoctor(requester) && reqId === id_doctor);

    if (!allowed) throw new ForbiddenException('Forbidden,No autorizado para crear esta cita');

    const ap = this.repo.create({
      id_user,
      id_doctor,
      datetime: new Date(dto.datetime),
      status: dto.status ?? 'pending',
    });
    return this.repo.save(ap);
  }

  async findAll(requester: ReqUser) {
    if (!this.isAdmin(requester)) throw new ForbiddenException('Forbidden,No autorizado');
    return this.repo.find();
  }

  async findByUser(requester: ReqUser, id_user: string) {
    if (!(this.isAdmin(requester) || requester?.id === id_user)) {
      throw new ForbiddenException('Forbidden,No autorizado');
    }
    return this.repo.find({ where: { id_user } });
  }

  async findByDoctor(requester: ReqUser, id_doctor: string) {
    if (!(this.isAdmin(requester) || (this.isDoctor(requester) && requester?.id === id_doctor))) {
      throw new ForbiddenException('Forbidden,No autorizado');
    }
    return this.repo.find({ where: { id_doctor } });
  }

  async findByPair(requester: ReqUser, id_user: string, id_doctor: string) {
    const reqId = requester?.id;
    const allowed =
      this.isAdmin(requester) ||
      reqId === id_user ||
      (this.isDoctor(requester) && reqId === id_doctor);

    if (!allowed) throw new ForbiddenException('Forbidden,No autorizado');
    return this.repo.find({ where: { id_user, id_doctor } });
  }

  async findOneAuthorized(requester: ReqUser, id: string) {
    const ap = await this.repo.findOne({ where: { id } });
    if (!ap) throw new NotFoundException('No se pudo obtener cita');

    const allowed =
      this.isAdmin(requester) ||
      requester?.id === ap.id_user ||
      (this.isDoctor(requester) && requester?.id === ap.id_doctor);

    if (!allowed) throw new ForbiddenException('Forbidden,No autorizado');
    return ap;
  }

  async update(requester: ReqUser, id: string, dto: UpdateAppointmentDto) {
    const ap = await this.findOneAuthorized(requester, id);
    if (dto.datetime) ap.datetime = new Date(dto.datetime);
    if (dto.status) ap.status = dto.status as any;
    return this.repo.save(ap);
  }

  async remove(requester: ReqUser, id: string) {
    const ap = await this.findOneAuthorized(requester, id);
    await this.repo.remove(ap);
    return { message: 'Cita eliminada con exito' };
  }
}
