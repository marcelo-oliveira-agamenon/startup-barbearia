import { injectable, inject } from 'tsyringe';

import IClientRepository from '@modules/users/repositories/IClientRepository';

import { Client } from '@modules/users/infra/typeorm/entities/Client';

import { ICreateClientDTO } from '@modules/users/dtos/IClientDTO';

@injectable()
export default class CreateClientService {
  constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepository
  ) {}

  public async execute(data: ICreateClientDTO): Promise<Client | undefined> {
    const client_id = await this.clientRepository.create(data);
    console.log(client_id);
     if (!client_id) throw new Error('Client has not been created!');
      const client = await this.clientRepository.findOne(client_id);

    return client;
  }
}
