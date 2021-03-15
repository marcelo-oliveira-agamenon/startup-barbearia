import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { Schedule } from '@modules/schedules/infra/typeorm/entities/Schedule';

@Entity('service')
export default class Service {
  @PrimaryGeneratedColumn('uuid')
  service_id: string;

  @Column()
  name: string;

  @Column()
  value: number;

  @ManyToMany(() => Schedule)
  @JoinTable({
    name: 'schedule',
    joinColumns: [{ name: 'service_id' }],
    inverseJoinColumns: [{ name: 'service_id' }]
  })
  schedule: Schedule[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at: Date;
}
