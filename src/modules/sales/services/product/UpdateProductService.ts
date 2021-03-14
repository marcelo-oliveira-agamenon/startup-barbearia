import { injectable, inject } from 'tsyringe';

import IProductRepository from '@modules/sales/repositories/IProductRepository';

import Product from '@modules/sales/infra/typeorm/entities/Product';

import { IUpdateProductDTO } from '@modules/sales/dtos/IProductDTO';

import AppError from '@shared/errors/AppError';

@injectable()
export class UpdateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  public async execute(
    product_id: string,
    data: IUpdateProductDTO
  ): Promise<Product> {
    const productExists = await this.productRepository.findOne(product_id);
    if (!productExists) throw new AppError('Product does not exist!');

    const productEntity = Object.assign(productExists, data);

    const product = await this.productRepository.update(productEntity);

    return product;
  }
}
