import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_GLOBAL_PREFIX, APP_PORT } from './configs/evn';

(async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	if (typeof APP_GLOBAL_PREFIX === 'string') {
		// Set global app prefix, for example: site.com/api/...
		app.setGlobalPrefix(APP_GLOBAL_PREFIX);
	}

	await app.listen(APP_PORT || 3000);
})();
