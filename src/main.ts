import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

const customOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
  customSiteTitle: 'Docs',
};
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: true });
  const config = new DocumentBuilder()
    .setTitle('BOLETO API')
    .setDescription('Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document, customOptions);
  Logger.log('Mapped {/, GET} Swagger api route', 'RouterExplorer');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(Number(process.env.PORT));
}
bootstrap();
