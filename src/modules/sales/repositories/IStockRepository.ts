import { ICreateStockDTO, IListStocksDTO, IUpdateStockDTO } from "../dtos/IStockDTO";
import Stock from "../infra/typeorm/entities/Stock";

export default interface IStockRepository {
    create(data: ICreateStockDTO): Promise<Stock>;
    findByProductId(product_id: string): Promise<Stock | undefined>;
    update(stock_id: number, data: IUpdateStockDTO): Promise<Stock>;
    delete(stock_id: number): Promise<number | undefined>;
    findAll(query: IListStocksDTO): Promise<Stock[]>;
}