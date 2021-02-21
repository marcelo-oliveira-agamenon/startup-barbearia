import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
  } from 'typeorm';

@Entity('product')
export default class Product {
    @PrimaryGeneratedColumn('uuid')
    product_id: string;

    @Column()
    name: string;

    @Column({
        nullable: true
        })
    cost: number;

    @Column()
    price: number;

    @Column({
    nullable: true
    })
    description: string;

    @Column({
    nullable: true
    })
    discount: number;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;

    @DeleteDateColumn({ type: 'timestamptz' })
    deleted_at: Date;
}