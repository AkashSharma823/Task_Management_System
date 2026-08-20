import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectDto, UpdateProjectDto } from './dto';

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(Project) private readonly repo: Repository<Project>) {}
  findAll() { return this.repo.find({ order: { name: 'ASC' } }); }
  async findOne(id: string) { const project = await this.repo.findOne({ where: { id } }); if (!project) throw new NotFoundException('Project not found'); return project; }
  create(dto: CreateProjectDto) { return this.repo.save(this.repo.create(dto)); }
  async update(id: string, dto: UpdateProjectDto) { const item = await this.findOne(id); Object.assign(item, dto); return this.repo.save(item); }
  async remove(id: string) { const item = await this.findOne(id); await this.repo.remove(item); return { success: true }; }
}
