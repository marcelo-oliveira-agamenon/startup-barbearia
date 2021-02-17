import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateServicesService from '@modules/sales/services/service/CreateServicesService';

export default class ServicesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    try {
      const createService = container.resolve(CreateServicesService);
      const service = await createService.execute(data);

      return response.status(201).json(service);
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }
}
