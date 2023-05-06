import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AvailableRoomType } from './room.types';

export type RoomDocument = HydratedDocument<Room>;

@Schema()
export class Room {
	@Prop()
	number: string;

	@Prop()
	type: AvailableRoomType;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
