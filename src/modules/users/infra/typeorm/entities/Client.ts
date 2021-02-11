import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('client')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  client_id: string;

  @Column()
  client_name: string;

  @Column({
    length: '12',
    nullable: true
  })
  client_phone: string;

  @Column({
    nullable: true
  })
  client_mail: string;

  @Column({
    length: '14',
    nullable: true
  })
  client_cpf: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
