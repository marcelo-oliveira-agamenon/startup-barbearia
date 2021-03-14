import { container } from 'tsyringe';
import { Request, Response } from 'express';

import {
  CreateServiceService,
  ListServicesService,
  UpdateServiceService,
  GetServiceService,
  DeleteServiceService
} from '@modules/sales/services/service';

import { IGetServiceDTO } from '@modules/sales/dtos/IServiceDTO';

export default class ServicesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createService = container.resolve(CreateServiceService);
    const service = await createService.execute(data);

    return response.status(201).json(service);
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { service_id } = request.params;

    const getService = container.resolve(GetServiceService);
    const service = await getService.execute({ service_id });

    return response.status(200).json(service);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const query = request.query;

    const listServices = container.resolve(ListServicesService);
    const service = await listServices.execute(query);

    return response.status(200).json(service);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { service_id } = request.params;

    const deleteService = container.resolve(DeleteServiceService);
    const service = await deleteService.execute({ service_id });

    return response.status(200).json(service);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { service_id } = request.body;
    const data = request.body;

    const updateService = container.resolve(UpdateServiceService);
    const service = await updateService.execute(service_id, data);

    return response.status(200).json(service);
  }
}
