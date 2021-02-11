import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { classToClass } from 'class-transformer';

import CreateServicesService from '@modules/sales/services/services/CreateServicesService';

export default class ServicesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createService = container.resolve(CreateServicesService);
    const service = await createService.execute(data);

    return response.status(201).json(classToClass(service));
  }
}
