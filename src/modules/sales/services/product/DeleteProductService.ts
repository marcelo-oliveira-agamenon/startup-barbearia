import { injectable, inject } from 'tsyringe';

import IProductRepository from '@modules/sales/repositories/IProductRepository';

import Product from '@modules/sales/infra/typeorm/entities/Product';

import { IDeleteProductDTO } from '@modules/sales/dtos/IProductDTO';

import AppError from '@shared/errors/AppError';

@injectable()
export default class CreateProductsService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  public async execute({
    product_id
  }: IDeleteProductDTO): Promise<Product | undefined> {
    const productExist = await this.productRepository.findOne(product_id);
    if (!productExist) throw new AppError('Product does not exist!');

    const isProductDeleted = await this.productRepository.delete({ product_id });
    if (!isProductDeleted) throw new AppError('Product has not been deleted!');

    const product = await this.productRepository.findDeletedEntity(product_id);

    return product;
  }
}
