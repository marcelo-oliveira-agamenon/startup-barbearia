import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import Service from '@modules/sales/infra/typeorm/entities/Service';

export enum UserRole {
  ADMIN = 'admin',
  NORMAL = 'normal'
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @ManyToMany(() => Service, (service) => service.service_id)
  @JoinTable({
    name: 'user_service',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'user_id'
    },
    inverseJoinColumn: {
      name: 'service_id',
      referencedColumnName: 'service_id'
    }
  })
  services: Service[];

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
