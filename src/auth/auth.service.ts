import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './auth.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserRole } from '../enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>, 
    private readonly jwtService: JwtService,
  ) {}

  
  async register(dto: RegisterDto) {
    const existing = await this.authRepository.findOne({ where: { email: dto.email } });
    if (existing) throw new UnauthorizedException('Email already registered');
    
    const hash = await bcrypt.hash(dto.password, 10);
    const user = this.authRepository.create({
      username: dto.username,
      email: dto.email,
      password: hash,
      role: dto.role || UserRole.USER,
    });
    await this.authRepository.save(user);
    
    return { message: 'User registered successfully', user };
  }
  
  async login(dto: LoginDto) {
    const user = await this.authRepository.findOne({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('User not found');
    
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Incorrect password');
    
    const payload = { email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    
    return { access_token: token };
  }


// CRUD 
async findAll() {
  return this.authRepository.find();
}

async findOne(id: number) {
  const user = await this.authRepository.findOne({ where: { id } });
  if (!user) throw new NotFoundException('User not found');
  return user;
}


async update(id: number, dto: UpdateUserDto) {
  if (dto.password) dto.password = await bcrypt.hash(dto.password, 10);
  await this.authRepository.update(id, dto);
  return this.findOne(id);
}

async remove(id: number) {
  const user = await this.findOne(id);
  return this.authRepository.remove(user);
}
// CRUD
}