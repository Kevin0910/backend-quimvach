import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import serveStatic from 'serve-static';
import { setDefaultResultOrder } from 'node:dns';
setDefaultResultOrder('ipv4first');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://forestgreen-rhinoceros-223201.hostingersite.com'
    ],
    Credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  app.use('/uploads/pdfs', serveStatic(join(__dirname, '..', 'uploads', 'pdfs')));


  await app.listen(process.env.PORT || 3000, '0.0.0.0');

}
bootstrap();
