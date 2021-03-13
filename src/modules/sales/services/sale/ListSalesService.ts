import { injectable, inject } from 'tsyringe';
import { IListSalesDTO } from '@modules/sales/dtos/ISaleDTO';

import ISaleRepository from '@modules/sales/repositories/ISaleRepository';

import Sale from '@modules/sales/infra/typeorm/entities/Sale';

import AppError from '@shared/errors/AppError';

@injectable()
export class ListSalesService {
  constructor(
    @inject('SaleRepository')
    private saleRepository: ISaleRepository
  ) {}

  public async execute(query: IListSalesDTO): Promise<Sale[]> {
    const sales = await this.saleRepository.findAll(query);

    return sales;
  }
}
