import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import serveStatic from 'serve-static';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:4200', 'http://192.168.1.38:4200'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  app.use('/uploads/pdfs', serveStatic(join(__dirname, '..', 'uploads', 'pdfs')));


  await app.listen(process.env.PORT || 3000, '0.0.0.0');

}
bootstrap();
