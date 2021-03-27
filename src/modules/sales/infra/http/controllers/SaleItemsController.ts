import { container } from 'tsyringe';
import { Request, Response } from 'express';

import {
  CreateSaleService,
  GetSaleService,
  ListSalesService,
  DeleteSaleService,
  UpdateSaleService
} from '@modules/sales/services/sale';

export default class SaleController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    // const createSale = container.resolve(CreateSaleService);
    // const sale = await createSale.execute(data);

    return response.status(201).json({});
  }
}
