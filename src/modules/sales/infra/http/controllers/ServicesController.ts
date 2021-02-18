import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateServicesService from '@modules/sales/services/service/CreateServicesService';
import GetServicesListServices from '@modules/sales/services/service/GetServicesListServices';
import UpdateServicesService from '@modules/sales/services/service/UpdateServicesService';
import GetServicesService from '@modules/sales/services/service/GetServicesService';
import DeleteServicesService from '@modules/sales/services/service/DeleteServicesService';

export default class ServicesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    try {
      const createService = container.resolve(CreateServicesService);
      const service = await createService.execute(data);

      return response.status(201).json(service);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async listOne(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { service_id } = request.body;

    try {
      const createService = container.resolve(GetServicesService);
      const service = await createService.execute(service_id);

      return response.status(200).json(service);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const { service_id } = request.body;

    try {
      const listService = container.resolve(GetServicesListServices);
      const service = await listService.execute(service_id);

      return response.status(200).json(service);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { service_id } = request.body;

    try {
      const deleteService = container.resolve(DeleteServicesService);
      const service = await deleteService.execute(service_id);

      return response.status(200).json(service);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { service_id } = request.body;
    const data = request.body;

    try {
      const updateService = container.resolve(UpdateServicesService);
      const service = await updateService.execute(data, service_id);

      return response.status(200).json(service);
    } catch (error) {
      throw new Error(error);
    }
  }
}
