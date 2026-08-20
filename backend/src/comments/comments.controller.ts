import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CreateCommentDto } from './dto';
import { CommentsService } from './comments.service';

@Controller('tasks/:taskId/comments')
@UseGuards(AuthGuard)
export class CommentsController {
  constructor(private readonly service: CommentsService) {}
  @Get() find(@Param('taskId') taskId: string) { return this.service.findForTask(taskId); }
  @Post() create(@Param('taskId') taskId: string, @Body() dto: CreateCommentDto) { return this.service.create(taskId, dto.body); }
}
