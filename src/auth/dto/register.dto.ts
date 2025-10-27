import { IsString, IsEmail, MinLength, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../../enums/role.enum';

export class RegisterDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'role must be user or admin' })
  role?: UserRole;
}
