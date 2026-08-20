import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { AppModule } from '../src/app.module';

const server = express();

let bootstrapped = false;

async function bootstrap() {
  if (bootstrapped) return;

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors({
    origin: process.env.FRONTEND_URL ?? '*',
    credentials: true,
  });

  await app.init();
  bootstrapped = true;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await bootstrap();
  server(req, res);
}
