import { IUpdateStockDTO } from '@modules/sales/dtos/IStockDTO';
import Stock from '@modules/sales/infra/typeorm/entities/Stock';
import IStockRepository from '@modules/sales/repositories/IStockRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UpdateStockService {
  constructor(
    @inject('StockRepository')
    private stockRepository: IStockRepository
  ) {}

  public async execute(
    stock_id: number,
    data: IUpdateStockDTO
  ): Promise<Stock | undefined> {
    const stockExists = await this.stockRepository.findOne(data.stock_id);
    if (!stockExists) throw new AppError('Stock does not exist!');

    const stocktEntity = Object.assign(stockExists, data);

    const stock = await this.stockRepository.update(stocktEntity);

    return stock;
  }
}
