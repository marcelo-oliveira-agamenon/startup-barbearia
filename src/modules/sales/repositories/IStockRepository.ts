import { ICreateStockDTO, IDeleteStockDTO, IListStocksDTO, IUpdateStockDTO } from "../dtos/IStockDTO";
import Stock from "../infra/typeorm/entities/Stock";

export default interface IStockRepository {
    create(data: ICreateStockDTO): Promise<Stock>;
    findOne(stock_id: string): Promise<Stock | undefined>;
    update(stock_id: string, data: IUpdateStockDTO): Promise<Stock>;
    delete({ stock_id }: IDeleteStockDTO): Promise<number | undefined>;
    findAll(query: IListStocksDTO): Promise<Stock[]>;
}