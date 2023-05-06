import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';

(async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);

	const appPort = configService.get('APP_PORT');
	const appGlobalPrefix = configService.get('APP_GLOBAL_PREFIX');

	if (typeof appGlobalPrefix === 'string') {
		// Set global app prefix, for example: site.com/api/...
		app.setGlobalPrefix(appGlobalPrefix);
	}

	app.useGlobalFilters(new HttpExceptionFilter());
	await app.listen(appPort || 3000);
})();
