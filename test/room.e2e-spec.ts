import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Types, disconnect } from 'mongoose';

import { AppModule } from '../src/app.module';
import { CreateRoomDto } from '../src/room/dto/create-room.dto';

import { ROOM_NOT_FOUND_ERROR } from '../src/room/room.constants';

const testDto: CreateRoomDto = {
	number: 2,
	type: 'studio',
};

const notFoundBody = {
	statusCode: HttpStatus.NOT_FOUND,
	message: ROOM_NOT_FOUND_ERROR,
	error: 'Not Found',
};

describe('RoomController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/room/create (POST) - success', () => {
		return request(app.getHttpServer())
			.post('/room/create')
			.send(testDto)
			.expect(HttpStatus.CREATED)
			.then(({ body }: request.Response) => {
				createdId = body._id;
				expect(createdId).toBeDefined();
			});
	});

	it('/room/create (POST) - fail', () => {
		return request(app.getHttpServer())
			.post('/room/create')
			.send({ ...testDto, number: 'Room 1' })
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/room (GET ALL) - success', () => {
		return request(app.getHttpServer())
			.get('/room')
			.expect(HttpStatus.OK)
			.then(({ body }: request.Response) => {
				expect(body.length).toBeGreaterThan(0);
			});
	});

	it('/room/:id (GET) - success', () => {
		return request(app.getHttpServer())
			.get('/room/' + createdId)
			.expect(HttpStatus.OK)
			.then(({ body }: request.Response) => {
				expect(body).toBeDefined();
			});
	});

	it('/room/:id (GET) - fail', () => {
		return request(app.getHttpServer())
			.get('/room/' + new Types.ObjectId().toHexString())
			.expect(HttpStatus.NOT_FOUND, notFoundBody);
	});

	it('/room/:id (PATCH) - success', () => {
		const updatedTestDto = { ...testDto, type: 'double' };
		return request(app.getHttpServer())
			.patch('/room/' + createdId)
			.send(updatedTestDto)
			.expect(HttpStatus.OK);
	});

	it('/room/:id (PATCH) - fail', () => {
		const updatedTestDto = { ...testDto, type: 10 };
		return request(app.getHttpServer())
			.patch('/room/' + createdId)
			.send(updatedTestDto)
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('/room/:id (DELETE) - success', () => {
		return request(app.getHttpServer())
			.delete('/room/' + createdId)
			.expect(HttpStatus.OK);
	});

	it('/room/:id (DELETE) - fail', () => {
		return request(app.getHttpServer())
			.delete('/room/' + new Types.ObjectId().toHexString())
			.expect(HttpStatus.NOT_FOUND, notFoundBody);
	});

	afterAll(() => {
		disconnect();
	});
});
