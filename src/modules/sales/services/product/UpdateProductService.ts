import { injectable, inject } from 'tsyringe';

import IProductRepository from '@modules/sales/repositories/IProductRepository';

import Product from '@modules/sales/infra/typeorm/entities/Product';

import { IGetProductDTO, IUpdateProductDTO } from '@modules/sales/dtos/IProductDTO';

import AppError from '@shared/errors/AppError';

@injectable()
export default class GetProductsService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  public async execute(
    data: IUpdateProductDTO,
    product_id: string
  ): Promise<Product> {
    const productExists = await this.productRepository.findOne(product_id);
    if (!productExists) throw new AppError('Product does not exist!');

    const product = await this.productRepository.update(productExists.product_id, data);

    return product;
  }

}