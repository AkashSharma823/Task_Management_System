import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Comment } from './comment.entity';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), JwtModule.register({ secret: process.env.JWT_SECRET || 'change-me-in-development' })],
  controllers: [CommentsController], providers: [CommentsService], exports: [CommentsService],
})
export class CommentsModule {}
