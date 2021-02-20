import { injectable, inject } from 'tsyringe';

import IClientRepository from '@modules/users/repositories/IClientRepository';

import { Client } from '@modules/users/infra/typeorm/entities/Client';

import { IUpdateClientDTO } from '@modules/users/dtos/IClientDTO'

@injectable()
export default class UpdateClientService {
    constructor(
        @inject('ClientRepository')
        private clientRepository: IClientRepository
      ) {}

      public async execute(data: IUpdateClientDTO, client_id: string): Promise<Client> {
        const clientExists = await this.clientRepository.findOne(client_id);
        if (!clientExists) throw new Error('Client does not exist!');
    
        if (data.email) {
          if (data.email != clientExists.email) {
            const emailExists = await this.clientRepository.findByEmail(data.email);
            if (emailExists)
              throw new Error('This email already belongs to another client!');
          }
        }
        if (data.cpf) {
          if (data.cpf != clientExists.cpf) {
            const cpfExists = await this.clientRepository.findByCpf(data.cpf);
            if (cpfExists)
              throw new Error('This cpf already belongs to another client!');
          }
        }
        const client = await this.clientRepository.update(clientExists.client_id, data);
    
        return client;
      }
}