import { IsIn, IsOptional, IsString } from 'class-validator';

const priorities = ['none', 'urgent', 'high', 'medium', 'low'];
const statuses = ['backlog', 'todo', 'doing', 'completed', 'on-hold'];

export class CreateTaskDto {
  @IsString() title!: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsIn(statuses) status?: string;
  @IsOptional() @IsIn(priorities) priority?: string;
  @IsOptional() @IsString() memberId?: string;
  @IsOptional() @IsString() reporterId?: string;
  @IsOptional() @IsString() dueDate?: string;
  @IsOptional() @IsString() projectId?: string;
  @IsOptional() @IsString() labels?: string;
  @IsOptional() @IsString() team?: string;
}
export class UpdateTaskDto extends CreateTaskDto {}
