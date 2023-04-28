import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	getHello(): string {
		return 'Hello to test Nest.JS API!';
	}
}
