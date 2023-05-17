import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Types, disconnect } from 'mongoose';

import { AppModule } from '../src/app.module';
import { CreateScheduleDto } from '../src/schedule/dto/create-schedule.dto';

import { SCHEDULE_NOT_FOUND_ERROR } from '../src/schedule/schedule.constants';

const testDto: CreateScheduleDto = {
	room: new Types.ObjectId().toHexString(),
	date: new Date(),
};

const notFoundBody = {
	statusCode: HttpStatus.NOT_FOUND,
	message: SCHEDULE_NOT_FOUND_ERROR,
	error: 'Not Found',
};

describe('scheduleController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/schedule/create (POST) - success', () => {
		return request(app.getHttpServer())
			.post('/schedule/create')
			.send(testDto)
			.then(({ body }: request.Response) => {
				createdId = body._id;
				expect(createdId).toBeDefined();
			});
	});

	it('/schedule/create (POST) - fail', () => {
		return request(app.getHttpServer())
			.post('/schedule/create')
			.send({ ...testDto, room: 1 })
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/schedule (GET ALL) - success', () => {
		return request(app.getHttpServer())
			.get('/schedule')
			.expect(HttpStatus.OK)
			.then(({ body }: request.Response) => {
				expect(body.length).toBeGreaterThan(0);
			});
	});

	it('/schedule/:id (GET) - success', () => {
		return request(app.getHttpServer())
			.get('/schedule/' + createdId)
			.expect(HttpStatus.OK)
			.then(({ body }: request.Response) => {
				expect(body).toBeDefined();
			});
	});

	it('/schedule/:id (GET) - fail', () => {
		return request(app.getHttpServer())
			.get('/schedule/' + new Types.ObjectId().toHexString())
			.expect(HttpStatus.NOT_FOUND, notFoundBody);
	});

	it('/schedule/:id (PATCH) - success', () => {
		const updatedTestDto = { ...testDto, date: new Date() };
		return request(app.getHttpServer())
			.patch('/schedule/' + createdId)
			.send(updatedTestDto)
			.expect(HttpStatus.OK);
	});

	it('/schedule/:id (PATCH) - fail', () => {
		const updatedTestDto = { ...testDto, room: 10 };
		return request(app.getHttpServer())
			.patch('/schedule/' + createdId)
			.send(updatedTestDto)
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/schedule/:id (DELETE) - success', () => {
		return request(app.getHttpServer())
			.delete('/schedule/' + createdId)
			.expect(HttpStatus.OK);
	});

	it('/schedule/:id (DELETE) - fail', () => {
		return request(app.getHttpServer())
			.delete('/schedule/' + new Types.ObjectId().toHexString())
			.expect(HttpStatus.NOT_FOUND, notFoundBody);
	});

	afterAll(() => {
		disconnect();
	});
});
