// src/auth/auth.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
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
  @HttpCode(HttpStatus.OK) // 200
  login(@Body() dto: any) { return this.auth.login(dto); }
}
