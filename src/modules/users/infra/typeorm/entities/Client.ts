import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Schedule } from '../../../../schedules/infra/typeorm/entities/Schedule';

@Entity('client')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  client_id: string;

  @ManyToOne(() => Schedule, (schedule: Schedule) => schedule.client_id)
  @JoinColumn()
  schedule: Schedule;

  @Column()
  name: string;

  @Column({
    nullable: true
  })
  phone: string;

  @Column({
    nullable: true
  })
  email: string;

  @Column({
    length: '14',
    nullable: true
  })
  cpf: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at: Date;
}
