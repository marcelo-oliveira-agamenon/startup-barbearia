import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import {
  CreateClientService,
  GetClientService,
  ListClientsService,
  UpdateClientService,
  DeleteClientService
} from '@modules/users/services/client';

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

    const listClients = container.resolve(ListClientsService);
    const clients = await listClients.execute(query);

    return response.status(200).json(clients);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const { client_id } = request.params;

    const updateClient = container.resolve(UpdateClientService);
    const client = await updateClient.execute(client_id, data);

    return response.status(200).json(classToClass(client));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { client_id } = request.params;

    const deleteClient = container.resolve(DeleteClientService);
    const client = await deleteClient.execute({ client_id });

    return response.status(200).json(client);
  }
}
