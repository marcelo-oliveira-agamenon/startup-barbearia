import { getRepository, Repository } from 'typeorm';
import IProductRepository from '@modules/sales/repositories/IProductRepository';
import Product from '@modules/sales/infra/typeorm/entities/Product';
import {
  ICreateProductDTO,
  IListProductDTO,
  IDeleteProductDTO,
  IUpdateProductDTO
} from '@modules/sales/dtos/IProductDTO';

export default class ProductRepository implements IProductRepository {
    private ormRepository: Repository<Product>;
  
    constructor() {
      this.ormRepository = getRepository(Product);
    }
  
    public async create(data: ICreateProductDTO): Promise<Product> {
      const productInstance = await this.ormRepository.create(data);
      const product = await this.ormRepository.save(productInstance);
  
      return product;
    }
  
   
    findOne(product_id: string): Promise<undefined> {
        throw new Error('Method not implemented.');
    }
    update(product_id: string, data: IUpdateProductDTO): Promise<undefined> {
        throw new Error('Method not implemented.');
    }
    delete({ product_id }: IDeleteProductDTO): Promise<number | undefined> {
        throw new Error('Method not implemented.');
    }
    findDeletedEntity(product_id: string): Promise<Product | undefined> {
        throw new Error('Method not implemented.');
    }
    findByName(name: string): Promise<Product | undefined> {
        throw new Error('Method not implemented.');
    }
    findByDescription(description: string): Promise<Product[]> {
        throw new Error('Method not implemented.');
    }
    findAll(query: IListProductDTO): Promise<undefined[]> {
        throw new Error('Method not implemented.');
    }

  }