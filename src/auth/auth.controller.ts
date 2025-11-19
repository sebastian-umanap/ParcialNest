// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { Public } from './public.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() dto: any) { return this.auth.register(dto); }

  @Public()
  @Post('login')
  login(@Body() dto: any) { return this.auth.login(dto); }
}
