import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateClientService from '@modules/users/services/user/CreateClientService';
import GetClientService from '@modules/users/services/user/GetClientService';
import GetClientsListService from '@modules/users/services/user/GetClientsListService';
import UpdateClientService from '@modules/users/services/user/UpdateClientService';
import { classToClass } from 'class-transformer';
import DeleteClientService from '@modules/users/services/user/DeleteClientService';

export default class ClientController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    
    try {
      const createClient = container.resolve(CreateClientService);
      const client = await createClient.execute(data);
      return response.status(201).json(client);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { client_id } = request.params;
    try {
      const getClient = container.resolve(GetClientService);
      const client = await getClient.execute({ client_id });

      return response.status(200).json(client);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const query = request.query;
    try {
      const getClientsList = container.resolve(GetClientsListService);
      const clients = await getClientsList.execute(query);

      return response.status(200).json(clients);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const { client_id } = request.params;
    try {
      const updateClient = container.resolve(UpdateClientService);
      const client = await updateClient.execute(data, client_id);

      return response.status(200).json(classToClass(client));
    } catch (error) {
      throw new Error(error);
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { client_id } = request.params;
    try {
      const deleteClient = container.resolve(DeleteClientService);
      const client = await deleteClient.execute({ client_id });

      return response.status(200).json(client);
    } catch (error) {
      throw new Error(error);
    }
  }
}