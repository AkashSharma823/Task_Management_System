import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { CommentsModule } from './comments/comments.module';
import { User } from './users/user.entity';
import { Task } from './tasks/task.entity';
import { Project } from './projects/project.entity';
import { Comment } from './comments/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({ type: 'sqlite', database: 'data/dexter.sqlite', entities: [User, Task, Project, Comment], synchronize: true }),
    UsersModule, AuthModule, TasksModule, ProjectsModule, CommentsModule,
  ],
})
export class AppModule {}
