import { Exclude } from 'class-transformer';
export enum UserRole {
  ADMIN = 'admin',
  NORMAL = 'normal'
}

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column()
  user_name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.NORMAL
  })
  user_type: UserRole;

  @Column({
    nullable: true
  })
  user_phone: string;

  @Column({ length: 14 })
  cpf: string;

  @Column({
    select: false,
    length: 12
  })
  password: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
