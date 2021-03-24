import {
  ICreateStockDTO,
  IListStocksDTO,
  IUpdateStockDTO
} from '@modules/sales/dtos/IStockDTO';
import IStockRepository from '@modules/sales/repositories/IStockRepository';
import { getRepository, Repository } from 'typeorm';
import Stock from '../entities/Stock';

export default class StockRepository implements IStockRepository {
  private ormRepository: Repository<Stock>;

  constructor() {
    this.ormRepository = getRepository(Stock);
  }

  public async create(data: ICreateStockDTO): Promise<Stock> {
    const stockInstance = this.ormRepository.create(data);
    const stock = await this.ormRepository.save(stockInstance);

    return stock;
  }

  public async findByProductId(product_id: string): Promise<Stock | undefined> {
    const stock = await this.ormRepository.findOne(
      { product_id },
      { loadRelationIds: true }
    );

    return stock;
  }

  public async update(stockEntity: Stock): Promise<Stock> {
    const stock = await this.ormRepository.save(stockEntity);

    return stock;
  }

  public async delete(stock_id: number): Promise<number | null | undefined> {
    const isStockDeleted = await this.ormRepository.delete(stock_id);
    const isStockAffected = isStockDeleted.affected;

    return isStockAffected;
  }

  public async findAll(query: IListStocksDTO): Promise<Stock[]> {
    const { limit, offset } = query;
    const take = limit ? limit : 0,
      skip = offset ? offset : 0;

    const stocks = await this.ormRepository.find({
      take,
      skip,
      loadRelationIds: true
    });

    return stocks;
  }

  public async findOne(stock_id: number): Promise<Stock | undefined> {
    const stock = await this.ormRepository.findOne(stock_id, {
      loadRelationIds: true
    });

    return stock;
  }
}
