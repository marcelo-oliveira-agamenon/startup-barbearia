import { injectable, inject } from 'tsyringe';

import IProductRepository from '@modules/sales/repositories/IProductRepository';

import Product from '@modules/sales/infra/typeorm/entities/Product';

import { ICreateProductDTO } from '@modules/sales/dtos/IProductDTO';

import AppError from '@shared/errors/AppError';

@injectable()
export default class CreateProductsService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  public async execute(data: ICreateProductDTO): Promise<Product | undefined> {
    const productExists = await this.productRepository.findByName(data.name);
    if (productExists) {
      throw new AppError('This name already belongs to another product!');
    }
    const product = await this.productRepository.create(data);

    return product;
  }
}
