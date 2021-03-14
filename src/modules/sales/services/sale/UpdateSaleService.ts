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
    console.log(saleExists);
    if (!saleExists) throw new AppError('Sale does not exist!');
    console.log('data');
    console.log(data);

    const saleEntity = Object.assign(saleExists, data);
    console.log('merge');
    console.log(saleEntity);

    const sale = await this.saleRepository.update(saleEntity);

    return sale;
  }
}
