import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { SCHEDULE_NOT_FOUND_ERROR, SCHEDULE_NOT_AVAILABLE } from './schedule.constants';

@Controller('schedule')
export class ScheduleController {
	constructor(private readonly scheduleService: ScheduleService) {}

	@Post('create')
	async create(@Body() dto: CreateScheduleDto) {
		const reservedRoom = await this.scheduleService.findByDateAndRoomId(dto.date, dto.room);

		if (reservedRoom) {
			throw new BadRequestException(SCHEDULE_NOT_AVAILABLE);
		}

		return this.scheduleService.create(dto);
	}

	@Get()
	async getAll() {
		return this.scheduleService.findAll();
	}

	@Get(':id')
	async get(@Param('id') id: string) {
		try {
			const schedule = await this.scheduleService.findById(id);

			if (!schedule) {
				this.sendNotFoundException();
			}

			return schedule;
		} catch (error) {
			this.sendNotFoundException();
		}
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		try {
			const deletedSchedule = this.scheduleService.deleteById(id);

			if (!deletedSchedule) {
				this.sendNotFoundException();
			}

			return deletedSchedule;
		} catch (error) {
			this.sendNotFoundException();
		}
	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: CreateScheduleDto) {
		try {
			const updatedSchedule = await this.scheduleService.updateById(id, dto);

			if (!updatedSchedule) {
				this.sendNotFoundException();
			}

			return updatedSchedule;
		} catch (error) {
			this.sendNotFoundException();
		}
	}

	private sendNotFoundException() {
		throw new NotFoundException(SCHEDULE_NOT_FOUND_ERROR);
	}
}
