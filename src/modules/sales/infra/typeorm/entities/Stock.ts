import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
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

    @OneToMany(() => Product, (product) => product.product_id)
    products: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}