import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Patch,
	Post,
} from '@nestjs/common';

import { ROOM_NOT_FOUND_ERROR } from './room.constants';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
	constructor(private readonly roomService: RoomService) {}

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
		try {
			const room = await this.roomService.findById(id);

			if (!room) {
				this.sendNotFoundException();
			}

			return room;
		} catch (error) {
			this.sendNotFoundException();
		}
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		try {
			const deletedRoom = await this.roomService.deleteById(id);

			if (!deletedRoom) {
				this.sendNotFoundException();
			}

			return deletedRoom;
		} catch (error) {
			this.sendNotFoundException();
		}
	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: CreateRoomDto) {
		try {
			const updatedRoom = await this.roomService.updateById(id, dto);

			if (!updatedRoom) {
				this.sendNotFoundException();
			}

			return updatedRoom;
		} catch (error) {
			this.sendNotFoundException();
		}
	}

	private sendNotFoundException() {
		throw new NotFoundException(ROOM_NOT_FOUND_ERROR);
	}
}
