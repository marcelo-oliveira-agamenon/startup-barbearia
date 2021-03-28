import { injectable, inject } from 'tsyringe';

import IStockRepository from '@modules/sales/repositories/IStockRepository';
import { ICreateStockDTO } from '@modules/sales/dtos/IStockDTO';
import Stock from '@modules/sales/infra/typeorm/entities/Stock';
import AppError from '@shared/errors/AppError';

@injectable()
export class CreateStockService {
  constructor(
    @inject('StockRepository')
    private stockRepository: IStockRepository
  ) {}

  public async execute(data: ICreateStockDTO): Promise<Stock | undefined> {
    const stockExists = await this.stockRepository.findByProductId(
      data.product_id
    );
    if (stockExists) {
      throw new AppError('This name already belongs to another stock!');
    }
    const stock = await this.stockRepository.create(data);

    return stock;
  }
}
