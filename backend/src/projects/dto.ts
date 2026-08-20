import { IsIn, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString() name!: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsIn(['urgent', 'high', 'medium', 'low', 'none']) priority?: string;
  @IsOptional() @IsString() leadId?: string;
  @IsOptional() @IsString() dueDate?: string;
}
export class UpdateProjectDto extends CreateProjectDto {}
