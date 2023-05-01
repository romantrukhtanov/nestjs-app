import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseFilters,
	NotFoundException,
} from '@nestjs/common';

import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { SCHEDULE_NOT_FOUND_ERROR } from './schedule.constants';
import { MongooseExceptionFilter } from '../filters/mongoose-exception.filter';

@Controller('schedule')
@UseFilters(MongooseExceptionFilter)
export class ScheduleController {
	constructor(private readonly scheduleService: ScheduleService) {}

	@Post('create')
	async create(@Body() createScheduleDto: CreateScheduleDto) {
		return this.scheduleService.create(createScheduleDto);
	}

	@Get()
	async getAll() {
		return this.scheduleService.findAll();
	}

	@Get(':id')
	async get(@Param('id') id: string) {
		const schedule = await this.scheduleService.findById(id);

		if (!schedule) {
			this.sendNotFoundException();
		}

		return schedule;
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deletedSchedule = this.scheduleService.deleteById(id);

		if (!deletedSchedule) {
			this.sendNotFoundException();
		}

		return deletedSchedule;
	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: CreateScheduleDto) {
		const updatedSchedule = await this.scheduleService.updateById(id, dto);

		if (!updatedSchedule) {
			this.sendNotFoundException();
		}

		return updatedSchedule;
	}

	private sendNotFoundException() {
		throw new NotFoundException(SCHEDULE_NOT_FOUND_ERROR);
	}
}
