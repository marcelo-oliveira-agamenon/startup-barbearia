import { container } from 'tsyringe';
import { Request, Response } from 'express';

import {
  CreateSaleService,
  GetSaleService,
  ListSalesService,
  DeleteSaleService
} from '@modules/sales/services/sale';

export default class SaleController {
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
    const service = await listSales.execute(query);

    return response.status(200).json(service);
  }

  // public async update(request: Request, response: Response): Promise<Response> {
  //   const { service_id } = request.body;
  //   const data = request.body;

  //   const updateService = container.resolve(UpdateServicesService);
  //   const service = await updateService.execute(data, service_id);

  //   return response.status(200).json(service);
  // }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { sale_id } = request.params;

    const deleteSale = container.resolve(DeleteSaleService);
    const sale = await deleteSale.execute({ sale_id });

    return response.status(200).json(sale);
  }
}
