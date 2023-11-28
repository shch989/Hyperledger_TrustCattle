import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// Middleware
import { ValidationPipe } from '@nestjs/common';
// Exception filter
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  await app.listen(5000);
}
bootstrap();
