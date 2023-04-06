import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.use(morgan('tiny'));

  app.setGlobalPrefix('api');

  app.enableCors();

  await app.listen(configService.get('PORT') || 8080);
}
bootstrap();
