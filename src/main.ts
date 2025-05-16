import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import serveStatic from 'serve-static';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['https://forestgreen-rhinoceros-223201.hostingersite.com'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  app.use('/uploads/pdfs', serveStatic(join(__dirname, '..', 'uploads', 'pdfs')));


  await app.listen(Number(process.env.PORT));

}
bootstrap();
