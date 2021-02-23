import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateServicesService from '@modules/sales/services/service/CreateServicesService';
import GetServicesListServices from '@modules/sales/services/service/GetServicesListServices';
import UpdateServicesService from '@modules/sales/services/service/UpdateServicesService';
import GetServiceService from '@modules/sales/services/service/GetServiceService';
import DeleteServicesService from '@modules/sales/services/service/DeleteServicesService';
import { IGetServiceDTO } from '@modules/sales/dtos/IServiceDTO';

export default class ServicesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createService = container.resolve(CreateServicesService);
    const service = await createService.execute(data);

    return response.status(201).json(service);
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { service_id } = request.params;

    const getService = container.resolve(GetServiceService);
    const service = await getService.execute({ service_id: +service_id });

    return response.status(200).json(service);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const query = request.query;

    const getServicesList = container.resolve(GetServicesListServices);
    const service = await getServicesList.execute(query);

    return response.status(200).json(service);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { service_id } = request.params;
    const id: IGetServiceDTO = {
      service_id: Number(service_id)
    };

    const deleteService = container.resolve(DeleteServicesService);
    const service = await deleteService.execute(id);

    return response.status(200).json(service);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { service_id } = request.body;
    const data = request.body;

    const updateService = container.resolve(UpdateServicesService);
    const service = await updateService.execute(data, service_id);

    return response.status(200).json(service);
  }
}
