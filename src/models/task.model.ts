import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  theme: string;

  @Column()
  message: string;

  @Column({nullable:true})
  compete_message: string|null;

  @Column({nullable:true})
  canceled_message: string|null;

  @Column({ type: 'timestamptz' })
  date_creation: Date;

  @Column({ type: 'timestamptz' })
  date_updated: Date;
}
