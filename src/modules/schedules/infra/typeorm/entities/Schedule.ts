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
import Client from '@modules/users/infra/typeorm/entities/Client';
import { User } from '@modules/users/infra/typeorm/entities/User';
import Service from '@modules/sales/infra/typeorm/entities/Service';

@Entity('schedule')
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  @Column()
  user_id: string;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  @Column()
  client_id: string;

  @ManyToOne(() => Service)
  @JoinColumn({ name: 'service_id' })
  @Column()
  service_id: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  status: boolean;

  @Column()
  description: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at: Date;
}
