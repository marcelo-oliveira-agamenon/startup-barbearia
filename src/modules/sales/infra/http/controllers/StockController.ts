import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { CreateStockService } from '@modules/sales/services/stock/CreateStockService';
import { GetStockService } from '@modules/sales/services/stock/GetStockService';
import { ListStocksService } from '@modules/sales/services/stock/ListStocksService';

export default class StockController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const createStock = container.resolve(CreateStockService);
    const stock = await createStock.execute(data);
    return response.status(201).json(stock);
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.params;

    const getStock = container.resolve(GetStockService);
    const stock = await getStock.execute({ product_id });

    return response.status(200).json(stock);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const query = request.query;

    const listStockss = container.resolve(ListStocksService);
    const stocks = await listStockss.execute(query);

    return response.status(200).json(stocks);
  }
}
