import {
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    JoinColumn
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

    @OneToOne(() => Product, (product)=>product.product_id)
    @JoinColumn({name: "product_id"})
    product_id: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}