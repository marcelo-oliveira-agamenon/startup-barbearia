import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    JoinColumn
  } from 'typeorm';
import Product from './Product';

@Entity('stock')
export class Stock {
    @PrimaryGeneratedColumn('uuid')
    stock_id: string;

    @Column({
        default: 0
        })
    quantity: number;

    @OneToOne(() => Product)
    @JoinColumn()
    products: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}