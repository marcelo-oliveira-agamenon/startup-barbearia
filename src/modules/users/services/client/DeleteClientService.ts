import { injectable, inject } from 'tsyringe';

import IClientRepository from '@modules/users/repositories/IClientRepository';

import { Client } from '@modules/users/infra/typeorm/entities/Client';

import { IDeleteClientDTO } from '@modules/users/dtos/IClientDTO';

import AppError from '@shared/errors/AppError';

@injectable()
export default class DeleteClientService {
  constructor(
    @inject('ClientRepository')
    private clientRepository: IClientRepository
  ) {}

  public async execute({
    client_id
  }: IDeleteClientDTO): Promise<Client | undefined> {
    const clientExists = await this.clientRepository.findOne(client_id);
    if (!clientExists) throw new AppError('Client does not exist!');

    const isClientDeleted = await this.clientRepository.delete({ client_id });
    if (!isClientDeleted) throw new AppError('Client has not been deleted!');

    const client = await this.clientRepository.findDeletedEntity(client_id);

    return client;
  }
}
