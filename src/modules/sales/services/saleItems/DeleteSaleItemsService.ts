import { injectable, inject } from 'tsyringe';
import { IDeleteSaleItemDTO } from '@modules/sales/dtos/ISaleItemsDTO';

import SaleItems from '@modules/sales/infra/typeorm/entities/SaleItems';

import ISaleItemsRepository from '@modules/sales/repositories/ISaleItemsRepository';
import AppError from '@shared/errors/AppError';

@injectable()
export class DeleteSaleItemsService {
  constructor(
    @inject('SaleItemsRepository')
    private saleItemsRepository: ISaleItemsRepository
  ) {}

  public async execute(param: IDeleteSaleItemDTO): Promise<SaleItems> {
    const { sale_items_id } = param;
    const saleItemsExists = await this.saleItemsRepository.findOne(
      sale_items_id
    );

    if (!saleItemsExists) throw new AppError('Sale items does not exist!');

    const isSaleItemsDeleted = await this.saleItemsRepository.delete({
      sale_items_id
    });

    if (!isSaleItemsDeleted)
      throw new AppError(
        'Something went wrong! Sale items has not been deleted!'
      );

    const saleItems = await this.saleItemsRepository.findDeletedEntity(
      sale_items_id
    );

    if (!saleItems)
      throw new AppError(
        'Something went wrong! Sale items deleted has not been found!'
      );

    return saleItems;
  }
}
