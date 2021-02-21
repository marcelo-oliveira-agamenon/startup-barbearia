import Product from '@modules/sales/infra/typeorm/entities/Product';
import { ICreateProductDTO, IListProductDTO, IDeleteProductDTO, IUpdateProductDTO } from '@modules/sales/dtos/IProductDTO';

export default interface IProductRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  findOne(product_id: string): Promise<undefined | undefined>;
  update(product_id: string, data: IUpdateProductDTO): Promise<undefined>;
  delete({ product_id }: IDeleteProductDTO): Promise<number | undefined>;
  findDeletedEntity(product_id: string): Promise<Product | undefined>;
  findByName(name: string): Promise<Product | undefined>;
  findByDescription(description: string): Promise<Product[]>;
  findAll(query: IListProductDTO): Promise<undefined[]>;
}
