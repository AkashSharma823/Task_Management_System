import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  taskId!: string;

  @Column()
  author!: string;

  @Column()
  body!: string;

  @Column({ default: 'just now' })
  createdAtText!: string;
}
