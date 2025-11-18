import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
export class RegisterDto {
  @IsEmail() email: string;
  @MinLength(6) password: string;
  @IsNotEmpty() @IsString() name: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() roles?: string[]; // opcional, p.e. ["user"]
}
