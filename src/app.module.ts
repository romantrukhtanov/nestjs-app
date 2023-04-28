import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { getMongoConfig } from './configs/mongo.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RoomModule } from './room/room.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: getMongoConfig,
			inject: [ConfigService],
		}),
		RoomModule,
		ScheduleModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
