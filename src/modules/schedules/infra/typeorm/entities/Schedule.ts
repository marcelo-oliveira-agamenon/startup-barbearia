import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
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

  @OneToOne(() => User, (user) => user.user_id)
  @Column()
  user_id: string;

  @OneToOne(() => Client, (client) => client.client_id)
  @Column()
  client_id: string;

  @ManyToMany(() => Service, (service) => service.service_id)
  @JoinColumn({ name: 'service_id' })
  @Column()
  service_id: number;

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
