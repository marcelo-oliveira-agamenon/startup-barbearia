import { getRepository, Repository, UpdateResult } from 'typeorm';
import IClientRepository from '@modules/users/repositories/IClientRepository';
import { Client } from '@modules/users/infra/typeorm/entities/Client';
import { ICreateClientDTO } from '@modules/users/dtos/IClientDTO';

export default class ClientRepository implements IClientRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }

  public async create(data: ICreateClientDTO): Promise<string> {
    const client = await this.ormRepository.insert(data);
    const client_id = client.identifiers[0].client_id;
    return client_id;
  }

  public async findOne(id: string): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne(id);

    return client;
  }

  public async delete(data: ICreateClientDTO): Promise<UpdateResult> {
    const clientId = await this.ormRepository.softDelete(data);
    return clientId;
  }
}
