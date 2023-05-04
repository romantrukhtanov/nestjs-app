import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Room } from '../room/room.model';

export type ScheduleDocument = HydratedDocument<Schedule>;

@Schema()
export class Schedule {
	@Prop({
		unique: true,
	})
	date: Date;

	@Prop({ type: Types.ObjectId, ref: Room.name })
	room: Room;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
