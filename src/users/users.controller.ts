import { Body, Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { AssignRolesDto } from './dto/assign-roles.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get('me')
  me(@Req() req: any) {
    return this.users.me(req.user.sub);
  }

  @Get()
  @Roles('admin')
  list() {
    return this.users.list();
  }

  @Patch(':id/roles')
  @Roles('admin')
  assign(@Param('id') id: string, @Body() dto: AssignRolesDto) {
    return this.users.assignRoles(id, dto.roles);
  }
}
