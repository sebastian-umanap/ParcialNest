import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('appointments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AppointmentsController {
  constructor(private readonly service: AppointmentsService) {}

  // POST
  @Post(':id_user/:id_doctor')
  create(@Req() req: any, @Param('id_user') id_user: string, @Param('id_doctor') id_doctor: string, @Body() dto: CreateAppointmentDto) {
    return this.service.create(req.user, id_user, id_doctor, dto);
  }

  // GET
  @Get(':id_user/:id_doctor')
  findByPair(@Req() req: any, @Param('id_user') id_user: string, @Param('id_doctor') id_doctor: string) {
    return this.service.findByPair(req.user, id_user, id_doctor);
  }

  // GET 
  @Get('user/:id_user')
  findByUser(@Req() req: any, @Param('id_user') id_user: string) {
    return this.service.findByUser(req.user, id_user);
  }

  // GET
  @Get('doctor/:id_doctor')
  findByDoctor(@Req() req: any, @Param('id_doctor') id_doctor: string) {
    return this.service.findByDoctor(req.user, id_doctor);
  }

  // GET
  @Get('all')
  @Roles('admin')
  findAll(@Req() req: any) {
    return this.service.findAll(req.user);
  }

  // PATCH
  @Patch('by-id/:id')
  update(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateAppointmentDto) {
    return this.service.update(req.user, id, dto);
  }

  // DELETE 
  @Delete('by-id/:id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.service.remove(req.user, id);
  }
}
