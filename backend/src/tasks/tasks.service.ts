import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto, UpdateTaskDto } from './dto';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private readonly repo: Repository<Task>) {}

  async findAll(query: any) {
    const qb = this.repo.createQueryBuilder('task').orderBy("CASE task.status WHEN 'todo' THEN 1 WHEN 'doing' THEN 2 WHEN 'completed' THEN 3 ELSE 4 END").addOrderBy('task.dueDate', 'ASC');
    if (query.search) qb.andWhere('LOWER(task.title) LIKE LOWER(:search)', { search: `%${query.search}%` });
    for (const field of ['status', 'priority', 'memberId', 'reporterId', 'projectId', 'team']) {
      if (query[field]) qb.andWhere(`task.${field} = :${field}`, { [field]: query[field] });
    }
    if (query.label) qb.andWhere('task.labels LIKE :label', { label: `%${query.label}%` });
    return qb.getMany();
  }

  async findOne(id: string) {
    const task = await this.repo.findOne({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  create(dto: CreateTaskDto) { return this.repo.save(this.repo.create({ ...dto, labels: dto.labels || '' })); }

  async update(id: string, dto: UpdateTaskDto) {
    const task = await this.findOne(id);
    Object.assign(task, dto, { updatedText: 'just now' });
    return this.repo.save(task);
  }

  async remove(id: string) { const task = await this.findOne(id); await this.repo.remove(task); return { success: true }; }
}
