import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Schedule, ScheduleDocument } from './schedule.model';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Injectable()
export class ScheduleService {
	constructor(
		@InjectModel(Schedule.name) private readonly scheduleModel: Model<ScheduleDocument>,
	) {}

	async create(dto: CreateScheduleDto): Promise<ScheduleDocument> {
		return this.scheduleModel.create(dto);
	}

	async findById(id: string): Promise<ScheduleDocument> {
		return this.scheduleModel.findById(id).exec();
	}

	async findAll(): Promise<ScheduleDocument[]> {
		return this.scheduleModel.find().exec();
	}

	async findByDateAndRoomId(date: string, roomId: string): Promise<ScheduleDocument> {
		return this.scheduleModel.findOne({ date, room: roomId }).exec();
	}

	async deleteById(id: string): Promise<ScheduleDocument> {
		return this.scheduleModel.findByIdAndDelete(id).exec();
	}

	async updateById(id: string, dto: CreateScheduleDto): Promise<ScheduleDocument> {
		return this.scheduleModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}
}
