import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,// si tu as ajoueter un attribut dans la requete qui n'existe pas dans dto il va pas l'accepter (sans error)
    forbidNonWhitelisted: true,// with error
    transform: true, // il va transformer le type de la requete to expected  dto type
  }));
  await app.listen(3001);
}
bootstrap();
