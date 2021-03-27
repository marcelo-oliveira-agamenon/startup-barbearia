import {
  Check,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import Service from './Service';
import Product from './Product';

@Entity('sale_items')
@Check(
  `CASE WHEN "product_id" <> NULL THEN "quantity" <> NULL AND "service_id" = NULL WHEN "quantity" <> NULL THEN "product_id" <> NULL AND "service_id" = NULL WHEN "service_id" <> NULL THEN "product_id" = NULL AND "quantity" = NULL END`
)
export default class Sale {
  @PrimaryGeneratedColumn('uuid')
  sale_items_id: string;

  @ManyToOne(() => Sale, (sale) => sale.sale_id)
  @JoinColumn({ name: 'sale_id' })
  sale_id: string;

  @ManyToOne(() => Product, (product) => product.product_id)
  @JoinColumn({ name: 'product_id' })
  product_id: string;

  @ManyToOne(() => Service, (service) => service.service_id)
  @JoinColumn({ name: 'service_id' })
  service_id: string;

  @Column({ default: 0, type: 'numeric', precision: 10, scale: 2 })
  value: number;

  @Column({
    nullable: true
  })
  quantity: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deleted_at: Date;
}
