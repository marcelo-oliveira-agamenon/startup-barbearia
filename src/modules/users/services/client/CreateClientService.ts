import { injectable, inject } from 'tsyringe';

import IClientRepository from '@modules/users/repositories/IClientRepository';

import Client from '@modules/users/infra/typeorm/entities/Client';

import { ICreateClientDTO } from '@modules/users/dtos/IClientDTO';

import AppError from '@shared/errors/AppError';

@injectable()
export class CreateClientService {
  constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepository
  ) {}

  public async execute(data: ICreateClientDTO): Promise<Client | undefined> {
    if (data.email) {
      const emailExists = await this.clientRepository.findByEmail(data.email);
      if (emailExists) {
        throw new AppError('This email already belongs to another client!');
      }
    }

    if (data.cpf) {
      const cpfExists = await this.clientRepository.findByCpf(data.cpf);
      if (cpfExists)
        throw new AppError('This cpf already belongs to another client!');
    }

    const client = await this.clientRepository.create(data);

    return client;
  }
}
