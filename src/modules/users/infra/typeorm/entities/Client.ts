import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Schedule } from '@modules/schedules/infra/typeorm/entities/Schedule';

@Entity('client')
export default class Client {
  @PrimaryGeneratedColumn('uuid')
  client_id: string;

  @OneToMany(() => Schedule, (schedule: Schedule) => schedule.client_id)
  @JoinColumn({ name: 'client_id' })
  schedule: Schedule;

  @Column()
  name: string;

  @Column({ nullable: true, type: 'varchar' })
  phone: string;

  @Column({ nullable: true, type: 'varchar' })
  email: string;

  @Column({ length: '14', nullable: true, type: 'varchar' })
  cpf: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at: Date;
}
