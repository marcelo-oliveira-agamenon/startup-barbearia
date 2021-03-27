import { container } from 'tsyringe';
import { Request, Response } from 'express';

import {
  CreateUserService,
  UpdateUserService,
  DeleteUserService,
  GetUserService,
  ListUsersService,
  SignInUserService,
  ListUsersServicesService
} from '@modules/users/services/user';

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

    const listUsers = container.resolve(ListUsersService);
    const users = await listUsers.execute(query);

    return response.status(200).json(users);
  }

  public async listServices(
    request: Request,
    response: Response
  ): Promise<Response> {
    const query = request.query;

    const listUsersServices = container.resolve(ListUsersServicesService);
    const users = await listUsersServices.execute(query);

    return response.status(200).json(users);
  }

  public async signIn(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const signInUser = container.resolve(SignInUserService);
    const authentication = await signInUser.execute(data);

    return response.status(200).json(authentication);
  }
}
