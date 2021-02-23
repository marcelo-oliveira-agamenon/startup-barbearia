import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Client } from '../../../../users/infra/typeorm/entities/Client';
import { User } from '../../../../users/infra/typeorm/entities/User';
import Service from '../../../../sales/infra/typeorm/entities/Service';

@Entity('schedule')
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @OneToMany(() => User, (user) => user.user_id)
  user_id: User;

  @OneToMany(() => Client, (client) => client.client_id)
  client_id: Client;

  @ManyToMany(() => Service)
  @JoinTable()
  service_id: Service;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at: Date;
}
