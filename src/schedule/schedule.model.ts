import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Room } from '../room/room.model';

export type ScheduleDocument = HydratedDocument<Schedule>;

@Schema()
export class Schedule {
	@Prop()
	date: Date;

	@Prop({ type: Types.ObjectId, ref: Room.name })
	room: Room;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);

ScheduleSchema.index({ date: 1, room: 1 }, { unique: true });
