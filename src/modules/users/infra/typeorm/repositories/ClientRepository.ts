import { getRepository, Repository } from 'typeorm';
import IClientRepository from '@modules/users/repositories/IClientRepository';
import { Client } from '@modules/users/infra/typeorm/entities/Client';
import { ICreateClientDTO } from '@modules/users/dtos/IClientDTO';

export default class ClientRepository implements IClientRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }

  public async create(data: ICreateClientDTO): Promise<Client> {
    const client = await this.ormRepository.save(data);

    return client;
  }
}
