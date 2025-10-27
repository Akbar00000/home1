import { IsEmail, IsEnum, IsOptional, MinLength } from 'class-validator';
import { UserRole } from '../../enums/role.enum';

export class UpdateUserDto {
  @IsOptional()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
