import {
  ICreateStockDTO,
  IListStocksDTO,
  IUpdateStockDTO
} from '../dtos/IStockDTO';
import Stock from '../infra/typeorm/entities/Stock';

export default interface IStockRepository {
  create(data: ICreateStockDTO): Promise<Stock>;
  findByProductId(product_id: string): Promise<Stock | undefined>;
  findOne(stock_id: number): Promise<Stock | undefined>;
  update(stockEntity: Stock): Promise<Stock>;
  delete(stock_id: number): Promise<number | null | undefined>;
  findAll(query: IListStocksDTO): Promise<Stock[]>;
}
