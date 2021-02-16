import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateUserService from '@modules/users/services/user/CreateUserService';
import UpdateUserService from '@modules/users/services/user/UpdateUserService';
import DeleteUserService from '@modules/users/services/user/DeleteUserService';

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
    const { user_id } = request.params;
    try {
      const updateUser = container.resolve(UpdateUserService);
      const user = await updateUser.execute(data, user_id);

      return response.status(200).json(user);
    } catch (error) {
      throw new Error(error);
    }
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    try {
      const deleteUser = container.resolve(DeleteUserService);
      const user = await deleteUser.execute({ user_id });

      return response.status(200).json(user);
    } catch (error) {
      throw new Error(error);
    }
  }
}
