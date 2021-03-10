import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinColumn
} from 'typeorm';
import { Schedule } from '@modules/schedules/infra/typeorm/entities/Schedule';

@Entity('service')
export default class Service {
  @PrimaryGeneratedColumn('increment')
  service_id: number;

  @Column()
  name: string;

  @Column()
  value: number;

  @ManyToMany(() => Schedule, (schedule: Schedule) => schedule.service_id)
  @JoinColumn({ name: 'service_id' })
  schedule: Schedule;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at: Date;
}
