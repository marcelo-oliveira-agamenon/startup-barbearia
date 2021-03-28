import { injectable, inject } from 'tsyringe';

import IStockRepository from '@modules/sales/repositories/IStockRepository';
import { ICreateStockDTO } from '@modules/sales/dtos/IStockDTO';
import Stock from '@modules/sales/infra/typeorm/entities/Stock';
import AppError from '@shared/errors/AppError';
import IProductRepository from '@modules/sales/repositories/IProductRepository';

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
      throw new AppError('This product has a stock already!');
    }
    const stock = await this.stockRepository.create(data);

    return stock;
  }
}
