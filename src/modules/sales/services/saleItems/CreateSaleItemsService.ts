import { injectable, inject } from 'tsyringe';
import { ICreateSaleItemsDTO } from '@modules/sales/dtos/ISaleItemsDTO';

import SaleItems from '@modules/sales/infra/typeorm/entities/SaleItems';

import IProductRepository from '@modules/sales/repositories/IProductRepository';
import AppError from '@shared/errors/AppError';
import IServiceRepository from '@modules/sales/repositories/IServiceRepository';
import ISaleItemsRepository from '@modules/sales/repositories/ISaleItemsRepository';

@injectable()
export class CreateSaleItemsService {
  constructor(
    @inject('SaleItemsRepository')
    private saleItemsRepository: ISaleItemsRepository,
    @inject('ProductRepository')
    private productRepository: IProductRepository,
    @inject('ServiceRepository')
    private serviceRepository: IServiceRepository
  ) {}

  public async execute(data: ICreateSaleItemsDTO): Promise<SaleItems> {
    const { product_id, service_id } = data;

    if (product_id) {
      const product = await this.productRepository.findOne(product_id);
      if (!product) throw new AppError('Product does not exist!');
    } else if (service_id) {
      const service = await this.serviceRepository.findOne(service_id);
      if (!service) throw new AppError('Service does not exist!');
    }
    const saleItems = await this.saleItemsRepository.create(data);

    return saleItems;
  }
}
