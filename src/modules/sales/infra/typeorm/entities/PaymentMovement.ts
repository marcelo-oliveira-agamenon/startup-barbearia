import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import PaymentMethod from './PaymentMethod';
import Sale from './Sale';

@Entity('payment_movement')
export default class PaymentMovement {
  @PrimaryGeneratedColumn('uuid')
  payment_movement_id: string;

  @Column({ default: 0, type: 'numeric', precision: 10, scale: 2 })
  value: number;

  @OneToOne(
    () => PaymentMethod,
    (paymentMethod) => paymentMethod.payment_method_id
  )
  @JoinColumn({ name: 'payment_method_id' })
  payment_method_id: string;

  @ManyToOne(() => Sale, (sale) => sale.sale_id)
  @JoinColumn({ name: 'sale_id' })
  sale_id: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at: Date;
}
