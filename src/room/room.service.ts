import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Room, RoomDocument } from './room.model';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomService {
	constructor(@InjectModel(Room.name) private readonly roomModel: Model<RoomDocument>) {}

	async create(dto: CreateRoomDto): Promise<RoomDocument> {
		return this.roomModel.create(dto);
	}

	async findById(id: string): Promise<RoomDocument> {
		return this.roomModel.findById(id).exec();
	}

	async findAll(): Promise<RoomDocument[]> {
		return this.roomModel.find().exec();
	}

	async deleteById(id: string): Promise<RoomDocument> {
		return this.roomModel.findByIdAndDelete(id).exec();
	}

	async updateById(id: string, dto: CreateRoomDto): Promise<RoomDocument> {
		return this.roomModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}
}
