import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UsePipes,
	UseFilters,
	ValidationPipe,
	NotFoundException,
} from '@nestjs/common';

import { ROOM_NOT_FOUND_ERROR } from './room.constants';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomService } from './room.service';
import { MongooseExceptionFilter } from '../filters/mongoose-exception.filter';

@Controller('room')
@UseFilters(MongooseExceptionFilter)
export class RoomController {
	constructor(private readonly roomService: RoomService) {}

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateRoomDto) {
		return this.roomService.create(dto);
	}

	@Get()
	async getAll() {
		return this.roomService.findAll();
	}

	@Get(':id')
	async get(@Param('id') id: string) {
		const room = await this.roomService.findById(id);

		if (!room) {
			this.sendNotFoundException();
		}

		return room;
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deletedRoom = await this.roomService.deleteById(id);

		if (!deletedRoom) {
			this.sendNotFoundException();
		}

		return deletedRoom;
	}

	@UsePipes(new ValidationPipe())
	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: CreateRoomDto) {
		const updatedRoom = await this.roomService.updateById(id, dto);

		if (!updatedRoom) {
			this.sendNotFoundException();
		}

		return updatedRoom;
	}

	private sendNotFoundException() {
		throw new NotFoundException(ROOM_NOT_FOUND_ERROR);
	}
}
