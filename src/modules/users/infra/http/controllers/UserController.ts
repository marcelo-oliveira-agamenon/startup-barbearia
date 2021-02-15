import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateUserService from '@modules/users/services/user/CreateUserService';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    try {
      const createUser = container.resolve(CreateUserService);
      const user = await createUser.execute(data);
      return response.status(201).json(user);
    } catch (error) {
      throw new Error(error);
    }
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    try {
      // const createUser = container.resolve(CreateUserService);
      // const user = await createUser.execute(data);

      return response.status(201).json();
    } catch (error) {
      throw new Error(error);
    }
  }
}
