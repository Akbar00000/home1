import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { Auth } from './auth/auth.entity';
import { Product } from './product/product.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '198019572010',
      database: 'auth',
      entities: [Auth, Product],
      synchronize: true, 
    }),
    AuthModule,
    ProductModule,
  ],
})
export class AppModule {}
