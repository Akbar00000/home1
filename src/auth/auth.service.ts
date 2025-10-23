import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Auth } from './auth.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  Auth: any;
  constructor(
    @InjectModel(Auth) private authModel: typeof Auth,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    await this.authModel.create({
      email: dto.email,
      username: dto.username,
      password: hashedPassword,
    } as any);

    return {
      message: 'User registered successfully',
      username: dto.username,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.authModel.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.jwtService.sign({
      username: user.username,
    });

    return {
      message: 'Login successful',
      token,
    };
  }

  async profile(token: string) {
    try {
      const data = this.jwtService.verify(token);
      return await this.authModel.findOne({
        where: { username: data.username },
        attributes: ['username'],
      });
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
