import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Room } from '../room/room.model';

export type ScheduleDocument = HydratedDocument<Schedule>;

@Schema()
export class Schedule {
	// TODO: Update date format and types
	@Prop()
	date: string; // DD.MM - EXP: 01.12

	@Prop({ type: Types.ObjectId, ref: Room.name })
	room: Room;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
