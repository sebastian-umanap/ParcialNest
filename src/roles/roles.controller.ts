// src/roles/roles.controller.ts (ejemplo)
import { Controller, Get, Post, Body } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';

@Controller('roles')
export class RolesController {
  @Roles('admin')
  @Post()
  create(@Body() dto: any) { /* ... */ }

  @Roles('admin')
  @Get()
  list() { /* ... */ }
}
