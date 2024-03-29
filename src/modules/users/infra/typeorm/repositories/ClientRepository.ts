import { getRepository, Repository } from 'typeorm';
import IClientRepository from '@modules/users/repositories/IClientRepository';
import Client from '@modules/users/infra/typeorm/entities/Client';
import {
  ICreateClientDTO,
  IDeleteClientDTO,
  IListClientsDTO
} from '@modules/users/dtos/IClientDTO';

export default class ClientRepository implements IClientRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }

  public async create(data: ICreateClientDTO): Promise<Client> {
    const clientInstance = this.ormRepository.create(data);
    const client = await this.ormRepository.save(clientInstance);

    return client;
  }

  public async update(clientEntity: Client): Promise<Client> {
    const client = await this.ormRepository.save(clientEntity);

    return client;
  }

  public async delete({
    client_id
  }: IDeleteClientDTO): Promise<number | undefined> {
    const isClientDeleted = await this.ormRepository.softDelete(client_id);
    const isClientAffected = isClientDeleted.affected;

    return isClientAffected;
  }

  public async findOne(client_id: string): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne(client_id);

    return client;
  }

  public async findByCpf(cpf: string): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne({ cpf });

    return client;
  }

  public async findByEmail(email: string): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne({ email });

    return client;
  }

  public async findDeletedEntity(
    client_id: string
  ): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne(client_id, {
      withDeleted: true
    });

    return client;
  }

  public async findAll(query: IListClientsDTO): Promise<Client[]> {
    const { limit, offset } = query;
    const take = limit ? limit : 0,
      skip = offset ? offset : 0;

    const clients = await this.ormRepository.find({ take, skip });

    return clients;
  }
}
