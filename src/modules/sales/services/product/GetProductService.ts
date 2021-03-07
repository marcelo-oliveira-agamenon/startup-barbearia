import { injectable, inject } from 'tsyringe';

import IProductRepository from '@modules/sales/repositories/IProductRepository';

import Product from '@modules/sales/infra/typeorm/entities/Product';

import { IGetProductDTO } from '@modules/sales/dtos/IProductDTO';

import AppError from '@shared/errors/AppError';

@injectable()
export default class GetProductsService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  public async execute({ product_id }: IGetProductDTO): Promise<Product> {
    const product = await this.productRepository.findOne(product_id);
    if (!product) throw new AppError('Product does not exist!');

    return product;
  }
}
