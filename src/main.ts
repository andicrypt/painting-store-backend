import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle("Painting Store")
  .setDescription("The Painting Store API description")
  .setVersion("1.0")
  .addBearerAuth({
    type: 'http',
    in: 'header',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  })
  .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document); 

  app.use(cors());
  await app.listen(3000);
}
bootstrap();
