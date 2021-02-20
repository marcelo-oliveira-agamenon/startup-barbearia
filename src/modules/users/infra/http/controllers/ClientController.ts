import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateClientService from '@modules/users/services/client/CreateClientService';
import GetClientService from '@modules/users/services/client/GetClientService';
import GetClientsListService from '@modules/users/services/client/GetClientsListService';
import UpdateClientService from '@modules/users/services/client/UpdateClientService';
import { classToClass } from 'class-transformer';
import DeleteClientService from '@modules/users/services/client/DeleteClientService';

export default class ClientController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createClient = container.resolve(CreateClientService);
    const client = await createClient.execute(data);
    return response.status(201).json(client);
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { client_id } = request.params;

    const getClient = container.resolve(GetClientService);
    const client = await getClient.execute({ client_id });

    return response.status(200).json(client);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const query = request.query;

    const getClientsList = container.resolve(GetClientsListService);
    const clients = await getClientsList.execute(query);

    return response.status(200).json(clients);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const { client_id } = request.params;

    const updateClient = container.resolve(UpdateClientService);
    const client = await updateClient.execute(data, client_id);

    return response.status(200).json(classToClass(client));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { client_id } = request.params;

    const deleteClient = container.resolve(DeleteClientService);
    const client = await deleteClient.execute({ client_id });

    return response.status(200).json(client);
  }
}
