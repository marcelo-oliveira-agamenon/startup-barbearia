import { injectable, inject } from 'tsyringe';
import { IListSalesItemsDTO } from '@modules/sales/dtos/ISaleItemsDTO';

import SaleItems from '@modules/sales/infra/typeorm/entities/SaleItems';

import ISaleItemsRepository from '@modules/sales/repositories/ISaleItemsRepository';

@injectable()
export class ListSalesItemsService {
  constructor(
    @inject('SaleItemsRepository')
    private saleItemsRepository: ISaleItemsRepository
  ) {}

  public async execute(query: IListSalesItemsDTO): Promise<SaleItems[]> {
    const salesItems = await this.saleItemsRepository.findAll(query);
    return salesItems;
  }
}
