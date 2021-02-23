import { injectable, inject } from 'tsyringe';

import IProductRepository from '@modules/sales/repositories/IProductRepository';

import Product from '@modules/sales/infra/typeorm/entities/Product';

import { ICreateProductDTO, IListProductsDTO } from '@modules/sales/dtos/IProductDTO';

import AppError from '@shared/errors/AppError';

@injectable()
export default class CreateProductsService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  public async execute(query: IListProductsDTO): Promise<Product[]> {
    const products = await this.productRepository.findAll(query);

    return products;
  }

}