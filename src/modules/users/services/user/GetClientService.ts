import { injectable, inject } from 'tsyringe';

import IClientRepository from '@modules/users/repositories/IClientRepository';

import { Client } from '@modules/users/infra/typeorm/entities/Client';

import { IGetClientDTO } from '@modules/users/dtos/IClientDTO'

@injectable()
export default class GetClientService {
    constructor(
        @inject('ClientRepository')
        private clientRepository: IClientRepository
      ) {}

      public async execute({ client_id }: IGetClientDTO): Promise<Client | undefined> {
        const client = await this.clientRepository.findOne(client_id);
        if (!client) throw new Error('Client does not exist!');
    
        return client;
      }
}