import { getRepository, Repository } from 'typeorm';
import IProductRepository from '@modules/sales/repositories/IProductRepository';
import Product from '@modules/sales/infra/typeorm/entities/Product';
import {
  ICreateProductDTO,
  IListProductsDTO,
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
  
   
    public async findOne(product_id: string): Promise<Product | undefined> {
        const product = await this.ormRepository.findOne(product_id);
        
        return product;
    }

    public async update(product_id: string, data: IUpdateProductDTO): Promise<undefined> {
        throw new Error('Method not implemented.');
    }

    public async delete({ product_id }: IDeleteProductDTO): Promise<number | undefined> {
        throw new Error('Method not implemented.');
    }

    public async findDeletedEntity(product_id: string): Promise<Product | undefined> {
        throw new Error('Method not implemented.');
    }
    
    public async findByName(name: string): Promise<Product | undefined> {
        const product = await this.ormRepository.findOne({name});

        return product;
    }

    public async findAll(query: IListProductsDTO): Promise<Product[]> {
        const { limit, offset } = query;
        const take = limit ? limit : 0,
        skip = offset ? offset : 0;

        const products = await this.ormRepository.find({ take, skip });

        return products;
    }

  }