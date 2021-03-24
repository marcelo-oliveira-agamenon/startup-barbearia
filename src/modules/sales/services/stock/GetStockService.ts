import { IGetStockDTO } from '@modules/sales/dtos/IStockDTO';
import Stock from '@modules/sales/infra/typeorm/entities/Stock';
import IStockRepository from '@modules/sales/repositories/IStockRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetStockService {
  constructor(
    @inject('StockRepository')
    private stockRepository: IStockRepository
  ) {}

  public async execute(data: IGetStockDTO): Promise<Stock | undefined> {
    const stockExists = await this.stockRepository.findByProductId(data.product_id);
    if (!stockExists)
      throw new AppError('Stock does not exist!');
    
    const stock = await this.stockRepository.findByProductId(data.product_id);

    return stock;
  }
}