import { injectable, inject } from 'tsyringe';
import { IUpdateSaleItemsDTO } from '@modules/sales/dtos/ISaleItemsDTO';

import SaleItems from '@modules/sales/infra/typeorm/entities/SaleItems';

import ISaleItemsRepository from '@modules/sales/repositories/ISaleItemsRepository';
import AppError from '@shared/errors/AppError';

@injectable()
export class UpdateSaleItemsService {
  constructor(
    @inject('SaleItemsRepository')
    private saleItemsRepository: ISaleItemsRepository
  ) {}

  public async execute(
    sale_items_id: string,
    data: IUpdateSaleItemsDTO
  ): Promise<SaleItems> {
    const saleItemsExists = await this.saleItemsRepository.findOne(
      sale_items_id
    );
    if (!saleItemsExists) throw new AppError('Sale items does not exist!');

    const saleItems = await this.saleItemsRepository.update(
      Object.assign({}, saleItemsExists, data)
    );

    return saleItems;
  }
}
