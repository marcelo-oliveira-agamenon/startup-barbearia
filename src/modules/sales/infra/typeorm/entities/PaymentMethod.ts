import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('payment_method')
export default class PaymentMethod {
  @PrimaryGeneratedColumn('increment')
  payment_method_id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: false })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
