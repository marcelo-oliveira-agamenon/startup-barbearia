import { User } from '@modules/users/infra/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable
} from 'typeorm';

@Entity('service')
export default class Service {
  @PrimaryGeneratedColumn('uuid')
  service_id: string;

  @ManyToMany(() => User, (user) => user.user_id)
  @JoinTable({
    name: 'user_service',
    joinColumn: {
      name: 'service_id',
      referencedColumnName: 'service_id'
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'user_id'
    }
  })
  users: User[];

  @Column()
  name: string;

  @Column()
  value: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at: Date;
}
