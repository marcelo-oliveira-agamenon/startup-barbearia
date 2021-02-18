import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateClientService from '@modules/users/services/user/CreateClientService';

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
}