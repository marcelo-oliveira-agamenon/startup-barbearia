import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import Client from '@modules/users/infra/typeorm/entities/Client';
import { User } from '@modules/users/infra/typeorm/entities/User';

@Entity('sale')
export default class Sale {
  @PrimaryGeneratedColumn('uuid')
  sale_id: number;

  @ManyToOne(() => Client, (client) => client.sales)
  client: Client;

  @ManyToOne(() => User, (user) => user.sales)
  user: User;

  @Column({
    default: 0,
    type: 'numeric',
    precision: 10,
    scale: 2
  })
  discount: number;

  @Column()
  is_discount_fixed: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at: Date | null;
}
