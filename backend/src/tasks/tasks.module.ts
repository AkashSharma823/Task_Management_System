import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Task } from './task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), JwtModule.register({ secret: process.env.JWT_SECRET || 'change-me-in-development' })],
  controllers: [TasksController], providers: [TasksService], exports: [TasksService],
})
export class TasksModule {}
