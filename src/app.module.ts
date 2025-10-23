import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth/auth.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '198019572010', 
      database: 'auth', 
      models: [Auth],
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}
