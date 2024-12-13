import * as Sentry from '@sentry/node';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SentryFilter } from './sentry/sentry.filter';

async function bootstrap() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
  });
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new SentryFilter(httpAdapter));

  await app.listen(3000);
}
bootstrap();
