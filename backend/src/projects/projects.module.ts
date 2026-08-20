import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), JwtModule.register({ secret: process.env.JWT_SECRET || 'change-me-in-development' })],
  controllers: [ProjectsController], providers: [ProjectsService], exports: [ProjectsService],
})
export class ProjectsModule {}
