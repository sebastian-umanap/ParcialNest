// src/auth/auth.controller.ts
<<<<<<< HEAD
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
=======
import { Controller, Post, Body } from '@nestjs/common';
import { Public } from './public.decorator';
import { AuthService } from './auth.service';
>>>>>>> f541a4ea0df174faaed1aff827573eba9ff9e3a9

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

<<<<<<< HEAD
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.auth.register(dto); // 201 Created por defecto
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.auth.login(dto); // 200 OK
  }
=======
  @Public()
  @Post('register')
  register(@Body() dto: any) { return this.auth.register(dto); }

  @Public()
  @Post('login')
  login(@Body() dto: any) { return this.auth.login(dto); }
>>>>>>> f541a4ea0df174faaed1aff827573eba9ff9e3a9
}
