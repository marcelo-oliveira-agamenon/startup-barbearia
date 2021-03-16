import { injectable, inject } from 'tsyringe';
import { IGetSaleDTO } from '@modules/sales/dtos/ISaleDTO';

import ISaleRepository from '@modules/sales/repositories/ISaleRepository';

import Sale from '@modules/sales/infra/typeorm/entities/Sale';

import AppError from '@shared/errors/AppError';

@injectable()
export class GetSaleService {
  constructor(
    @inject('SaleRepository')
    private saleRepository: ISaleRepository
  ) {}

  public async execute({ sale_id }: IGetSaleDTO): Promise<Sale> {
    const sale = await this.saleRepository.findOne(sale_id);
    if (!sale) throw new AppError('Sale does not exist!');

    return sale;
  }
}
