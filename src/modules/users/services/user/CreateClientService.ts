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

  public async execute(data: ICreateClientDTO): Promise<Client> {
    const client = await this.clientRepository.create(data);

    return client;
  }
}
