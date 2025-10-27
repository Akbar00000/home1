import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomValidationPipe } from './validation/validation.pipe';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new CustomValidationPipe());


  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('Authentication va User CRUD API')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

 
  await app.listen(3000);
  console.log('🚀 Server running at: http://localhost:3000');
  console.log('📘 Swagger docs: http://localhost:3000/api');
}
bootstrap();
