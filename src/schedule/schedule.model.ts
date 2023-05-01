import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Room } from '../room/room.model';

export type ScheduleDocument = HydratedDocument<Schedule>;

@Schema()
export class Schedule {
	@Prop({
		unique: true,
	})
	date: Date; // DD.MM - EXP: 01.12

	@Prop({ type: Types.ObjectId, ref: Room.name })
	room: Room;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
