import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateUserService from '@modules/users/services/user/CreateUserService';
import UpdateUserService from '@modules/users/services/user/UpdateUserService';
import DeleteUserService from '@modules/users/services/user/DeleteUserService';
import GetUserService from '@modules/users/services/user/GetUserService';
import GetUsersListService from '@modules/users/services/user/GetUsersListService';
import SignInUserService from '@modules/users/services/user/SignInUserService';
import { classToClass } from 'class-transformer';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute(data);
    return response.status(201).json(classToClass(user));
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const { user_id } = request.params;
    const updateUser = container.resolve(UpdateUserService);
    const user = await updateUser.execute(data, user_id);

    return response.status(200).json(classToClass(user));
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const deleteUser = container.resolve(DeleteUserService);
    const user = await deleteUser.execute({ user_id });

    return response.status(200).json(user);
  }
  public async get(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const getUser = container.resolve(GetUserService);
    const user = await getUser.execute({ user_id });

    return response.status(200).json(user);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const query = request.query;

    const getUsersList = container.resolve(GetUsersListService);
    const users = await getUsersList.execute(query);

    return response.status(200).json(users);
  }

  public async signIn(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const signInUser = container.resolve(SignInUserService);
    const authentication = await signInUser.execute(data);

    return response.status(200).json(authentication);
  }
}
