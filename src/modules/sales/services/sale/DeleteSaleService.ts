import { injectable, inject } from 'tsyringe';
import { IDeleteSaleDTO } from '@modules/sales/dtos/ISaleDTO';

import ISaleRepository from '@modules/sales/repositories/ISaleRepository';

import Sale from '@modules/sales/infra/typeorm/entities/Sale';

import AppError from '@shared/errors/AppError';

@injectable()
export class DeleteSaleService {
  constructor(
    @inject('SaleRepository')
    private saleRepository: ISaleRepository
  ) {}

  public async execute({ sale_id }: IDeleteSaleDTO): Promise<Sale> {
    const saleExists = await this.saleRepository.findOne(sale_id);
    if (!saleExists) throw new AppError('Sale does not exist!');
    const isSaleDeleted = await this.saleRepository.delete({ sale_id });
    if (!isSaleDeleted)
      throw new AppError('Something went wrong! Sale has not been deleted!');

    const sale = await this.saleRepository.findDeletedEntity(sale_id);

    if (!sale) throw new AppError('Something went wrong! Not found');

    return sale;
  }
}
