import { injectable, inject } from 'tsyringe';
import { IGetSaleItemsDTO } from '@modules/sales/dtos/ISaleItemsDTO';

import SaleItems from '@modules/sales/infra/typeorm/entities/SaleItems';

import ISaleItemsRepository from '@modules/sales/repositories/ISaleItemsRepository';
import AppError from '@shared/errors/AppError';

@injectable()
export class GetSaleItemsService {
  constructor(
    @inject('SaleItemsRepository')
    private saleItemsRepository: ISaleItemsRepository
  ) {}

  public async execute(param: IGetSaleItemsDTO): Promise<SaleItems> {
    const { sale_items_id } = param;
    const saleItems = await this.saleItemsRepository.findOne(sale_items_id);

    if (!saleItems) throw new AppError('Sale items does not exist!');

    return saleItems;
  }
}
