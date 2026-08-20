import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comment) private readonly repo: Repository<Comment>) {}
  findForTask(taskId: string) { return this.repo.find({ where: { taskId }, order: { id: 'DESC' } }); }
  create(taskId: string, body: string) { return this.repo.save(this.repo.create({ taskId, body, author: 'Ankit Dutta', createdAtText: 'just now' })); }
}
