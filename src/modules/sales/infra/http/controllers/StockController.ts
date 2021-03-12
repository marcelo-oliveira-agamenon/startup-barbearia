import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { CreateStockService } from '@modules/sales/services/stock/CreateStockService';

export default class StockController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const createStock = container.resolve(CreateStockService);
    const stock = await createStock.execute(data);
    return response.status(201).json(stock);
  }
}