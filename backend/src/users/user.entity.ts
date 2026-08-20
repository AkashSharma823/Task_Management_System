import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ default: 'Guest User' })
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ default: 'Designer' })
  title!: string;

  @Column({ default: 'guest' })
  role!: string;

  @Column({ type: 'varchar', nullable: true })
  avatarUrl!: string | null;

  @Column({ type: 'varchar', unique: true, nullable: true })
  googleId!: string | null;
}
