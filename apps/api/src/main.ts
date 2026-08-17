import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bodyParser: true });
  app.setGlobalPrefix('v1');
  await app.listen(Number(process.env.PORT ?? 8080), '0.0.0.0');
}
void bootstrap();
