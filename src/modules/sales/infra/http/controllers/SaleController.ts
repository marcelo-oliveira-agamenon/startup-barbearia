import { container } from 'tsyringe';
import { Request, Response } from 'express';

import {
  CreateSaleService,
  GetSaleService,
  ListSalesService,
  DeleteSaleService,
  UpdateSaleService
} from '@modules/sales/services/sale';

class SaleController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createSale = container.resolve(CreateSaleService);
    const sale = await createSale.execute(data);

    return response.status(201).json(sale);
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { sale_id } = request.params;

    const getSale = container.resolve(GetSaleService);
    const sale = await getSale.execute({ sale_id });

    return response.status(200).json(sale);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const query = request.query;

    const listSales = container.resolve(ListSalesService);
    const sales = await listSales.execute(query);

    return response.status(200).json(sales);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { sale_id } = request.body;
    const data = request.body;

    const updateSale = container.resolve(UpdateSaleService);
    const sale = await updateSale.execute(sale_id, data);

    return response.status(200).json(sale);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { sale_id } = request.params;

    const deleteSale = container.resolve(DeleteSaleService);
    const sale = await deleteSale.execute({ sale_id });

    return response.status(200).json(sale);
  }
}
export default new SaleController();
