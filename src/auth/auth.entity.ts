import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../enums/role.enum';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity('auth')
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsNotEmpty()
  username: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;
}
