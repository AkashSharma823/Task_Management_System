import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column({ default: '' })
  description!: string;

  @Column({ default: 'backlog' })
  status!: string;

  @Column({ default: 'medium' })
  priority!: string;

  @Column({ type: 'varchar', nullable: true })
  memberId!: string | null;

  @Column({ type: 'varchar', nullable: true })
  reporterId!: string | null;

  @Column({ type: 'varchar', nullable: true })
  dueDate!: string | null;

  @Column({ type: 'varchar', nullable: true })
  projectId!: string | null;

  @Column({ default: '' })
  labels!: string;

  @Column({ default: 'Development' })
  team!: string;

  @Column({ default: 'now' })
  updatedText!: string;
}
