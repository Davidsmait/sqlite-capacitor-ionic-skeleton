import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'TODO',
})
export class Todo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  completed!: boolean;
}
