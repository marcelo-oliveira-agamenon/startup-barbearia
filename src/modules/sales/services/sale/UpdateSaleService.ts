import { injectable, inject } from 'tsyringe';
import { IUpdateSaleDTO } from '@modules/sales/dtos/ISaleDTO';

import ISaleRepository from '@modules/sales/repositories/ISaleRepository';

import Sale from '@modules/sales/infra/typeorm/entities/Sale';

import AppError from '@shared/errors/AppError';

@injectable()
export class UpdateSaleService {
  constructor(
    @inject('SaleRepository')
    private saleRepository: ISaleRepository
  ) {}

  public async execute(sale_id: string, data: IUpdateSaleDTO): Promise<Sale> {
    const saleExists = await this.saleRepository.findOne(sale_id);
    if (!saleExists) throw new AppError('Sale does not exist!');

    const sale = await this.saleRepository.update(
      Object.assign({}, saleExists, data)
    );

    return sale;
  }
}
