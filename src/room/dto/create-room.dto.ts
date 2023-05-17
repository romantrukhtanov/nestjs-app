import { IsNumber, IsString } from 'class-validator';
import { AvailableRoomType } from '../room.types';

export class CreateRoomDto {
	@IsNumber()
	number: number;

	@IsString()
	type: AvailableRoomType;
}
