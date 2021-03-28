import { container } from 'tsyringe';
import { Request, Response } from 'express';

import {
  CreateSaleItemsService,
  ListSalesItemsService,
  GetSaleItemsService
} from '@modules/sales/services/saleItems';

export default class SaleController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const createSaleItems = container.resolve(CreateSaleItemsService);
    const saleItems = await createSaleItems.execute(data);

    return response.status(201).json(saleItems);
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { sale_items_id } = request.params;

    const getSaleItems = container.resolve(GetSaleItemsService);
    const saleItems = await getSaleItems.execute({ sale_items_id });

    return response.status(200).json(saleItems);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const query = request.query;

    const listSalesItems = container.resolve(ListSalesItemsService);
    const salesItems = await listSalesItems.execute(query);

    return response.status(200).json(salesItems);
  }
}
