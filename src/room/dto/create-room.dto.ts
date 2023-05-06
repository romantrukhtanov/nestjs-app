import { AvailableRoomType } from '../room.types';

export class CreateRoomDto {
	number: number;
	type: AvailableRoomType;
}
