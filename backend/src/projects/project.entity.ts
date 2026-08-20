import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ default: 'No description' })
  description!: string;

  @Column({ default: 'medium' })
  priority!: string;

  @Column({ type: 'varchar', nullable: true })
  leadId!: string | null;

  @Column({ type: 'varchar', nullable: true })
  dueDate!: string | null;
}
