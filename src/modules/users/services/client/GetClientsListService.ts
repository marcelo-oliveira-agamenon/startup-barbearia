import { injectable, inject } from 'tsyringe';

import IClientRepository from '@modules/users/repositories/IClientRepository';

import { Client } from '@modules/users/infra/typeorm/entities/Client';

import { IListClientsDTO } from '@modules/users/dtos/IClientDTO';

@injectable()
export default class GetClientsListService {
  constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepository
  ) {}

  public async execute(query: IListClientsDTO): Promise<Client[]> {
    const clients = await this.clientRepository.findAll(query);

    return clients;
  }
}
