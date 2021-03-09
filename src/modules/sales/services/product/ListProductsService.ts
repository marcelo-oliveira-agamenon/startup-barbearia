import { injectable, inject } from 'tsyringe';

import IProductRepository from '@modules/sales/repositories/IProductRepository';

import Product from '@modules/sales/infra/typeorm/entities/Product';

import { IListProductsDTO } from '@modules/sales/dtos/IProductDTO';

@injectable()
export class ListProductsService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  public async execute(query: IListProductsDTO): Promise<Product[]> {
    const products = await this.productRepository.findAll(query);

    return products;
  }
}
