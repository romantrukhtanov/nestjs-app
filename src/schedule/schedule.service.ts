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

	async create(createScheduleDto: CreateScheduleDto): Promise<ScheduleDocument> {
		return this.scheduleModel.create(createScheduleDto);
	}

	async findById(id: string): Promise<ScheduleDocument> {
		return this.scheduleModel.findById(id).exec();
	}

	async findAll(): Promise<ScheduleDocument[]> {
		return this.scheduleModel.find().exec();
	}

	async deleteById(id: string): Promise<ScheduleDocument> {
		return this.scheduleModel.findByIdAndDelete(id).exec();
	}

	async updateById(id: string, createScheduleDto: CreateScheduleDto): Promise<ScheduleDocument> {
		return this.scheduleModel.findByIdAndUpdate(id, createScheduleDto, { new: true }).exec();
	}
}
