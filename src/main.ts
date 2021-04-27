import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { doc } from 'prettier';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,// si tu as ajoueter un attribut dans la requete qui n'existe pas dans dto il va pas l'accepter (sans error)
    forbidNonWhitelisted: true,// with error
    transform: true, // il va transformer le type de la requete to expected  dto type
  }));
  const options = new DocumentBuilder()
    .setTitle("Flex BackEnd ")
    .setDescription("Flex Application")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 8080);
  // await app.listen(3000);
}
bootstrap();
