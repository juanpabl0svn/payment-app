import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true, logger: ['error', 'warn', 'log'] });

  app.setGlobalPrefix('v1');

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Wompi API')
    .setDescription('API para gestionar productos y transacciones de pago usando Wompi')
    .setVersion('1.0')
    .addTag('Productos')
    .addTag('Transacciones')
    .build();


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
