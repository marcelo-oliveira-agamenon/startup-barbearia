import { IListStocksDTO } from '@modules/sales/dtos/IStockDTO';
import Stock from '@modules/sales/infra/typeorm/entities/Stock';
import IStockRepository from '@modules/sales/repositories/IStockRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListStocksService {
  constructor(
    @inject('StockRepository')
    private stockRepository: IStockRepository
  ) {}

  public async execute(query: IListStocksDTO): Promise<Stock[]> {
    const stocks = await this.stockRepository.findAll(query);

    return stocks;
  }
}
