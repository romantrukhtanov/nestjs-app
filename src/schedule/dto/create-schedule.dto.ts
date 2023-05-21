import { IsDateString, IsString } from 'class-validator';

export class CreateScheduleDto {
	@IsDateString()
	date: Date;

	@IsString()
	room: string;
}
