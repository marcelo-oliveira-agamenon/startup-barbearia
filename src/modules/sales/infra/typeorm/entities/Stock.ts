import {
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    JoinColumn,
    Index
  } from 'typeorm';
import Product from './Product';

@Entity('stock')
export default class Stock {
    @PrimaryGeneratedColumn('increment')
    stock_id: number;

    @Column({
        default: 0
        })
    quantity: number;

    @OneToOne(() => Product)
    @JoinColumn()
    @Index({unique: true})
    product: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}