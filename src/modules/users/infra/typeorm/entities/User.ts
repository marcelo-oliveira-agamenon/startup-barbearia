import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { Schedule } from '@modules/schedules/infra/typeorm/entities/Schedule';

export enum UserRole {
  ADMIN = 'admin',
  NORMAL = 'normal'
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @OneToMany(() => Schedule, (schedule: Schedule) => schedule.user_id)
  @JoinColumn()
  schedule: Schedule;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.NORMAL
  })
  user_type: UserRole;

  @Column({ nullable: true, type: 'varchar' })
  phone: string;

  @Column({ length: 14, nullable: true, type: 'varchar' })
  cpf: string;

  @Column()
  email: string;

  @Column({ select: false })
  @Exclude()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at: Date;
}
