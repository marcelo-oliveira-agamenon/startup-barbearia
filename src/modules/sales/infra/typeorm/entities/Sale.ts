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

@Entity('sale')
export default class Sale {
  @PrimaryGeneratedColumn('uuid')
  sale_id: string;

  @ManyToOne(() => Client, (client) => client.client_id)
  @JoinColumn({ name: 'client_id' })
  client_id: string;

  @ManyToOne(() => User, (user) => user.user_id)
  @JoinColumn({ name: 'user_id' })
  user_id: string;

  @Column({ default: 0, type: 'numeric', precision: 10, scale: 2 })
  value: number;

  @Column({
    default: 0,
    type: 'numeric',
    precision: 10,
    scale: 2
  })
  discount: number;

  @Column({ default: true })
  is_discount_fixed: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at: Date | null;
}
