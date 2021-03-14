import Product from '@modules/sales/infra/typeorm/entities/Product';
import {
  ICreateProductDTO,
  IListProductsDTO,
  IDeleteProductDTO
} from '@modules/sales/dtos/IProductDTO';

export default interface IProductRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  findOne(product_id: string): Promise<Product | undefined>;
  update(productEntity: Product): Promise<Product>;
  delete({ product_id }: IDeleteProductDTO): Promise<number | undefined>;
  findDeletedEntity(product_id: string): Promise<Product | undefined>;
  findByName(name: string): Promise<Product | undefined>;
  findAll(query: IListProductsDTO): Promise<Product[]>;
}
