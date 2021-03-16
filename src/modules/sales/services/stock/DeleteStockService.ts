import { injectable, inject } from 'tsyringe';

import IStockRepository from "@modules/sales/repositories/IStockRepository";
import Stock from '@modules/sales/infra/typeorm/entities/Stock';
import AppError from '@shared/errors/AppError';
import { IDeleteStockDTO } from '@modules/sales/dtos/IStockDTO';

@injectable()
export class DeleteStockService {
  constructor(
    @inject('StockRepository')
    private stockRepository: IStockRepository
  ) {}

  public async execute(data: IDeleteStockDTO): Promise<Stock | undefined> {
    const stockExists = await this.stockRepository.findOne(data.stock_id);
    if (!stockExists) {
      throw new AppError('Stock does not exist!');
    }

    const isStockDeleted = await this.stockRepository.delete(data.stock_id);
    if (!isStockDeleted) throw new AppError('Stock has not been deleted!');

    return stockExists;
  }
}