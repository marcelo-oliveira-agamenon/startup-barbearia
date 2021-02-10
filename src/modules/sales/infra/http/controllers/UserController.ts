import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/sales/services/';

export default class ServicesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute(data);

    return response.status(201).json(classToClass(user));
  }
}
