import { getRepository, Repository } from 'typeorm';
import IClientRepository from '@modules/users/repositories/IClientRepository';
import { Client } from '@modules/users/infra/typeorm/entities/Client';
import { ICreateClientDTO, IDeleteClientDTO, IListClientsDTO, IUpdateClientDTO } from '@modules/users/dtos/IClientDTO';

export default class ClientRepository implements IClientRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }

  public async create(data: ICreateClientDTO): Promise<Client> {
    const clientInstance =  this.ormRepository.create(data);
    const client = await this.ormRepository.save(clientInstance);
    return client;
  }

  public async update(client_id: string, data: IUpdateClientDTO): Promise<Client> {
    const clientExists = await this.ormRepository.findOne(client_id);
    const isClientUpdated = await this.ormRepository.save(
      Object.assign(clientExists, data)
    );
    return isClientUpdated;
  }

  public async delete({ client_id }: IDeleteClientDTO): Promise<number | undefined> {
    const isClientDeleted = await this.ormRepository.softDelete(client_id);
    const isClientAffected = isClientDeleted.affected;

    return isClientAffected;
  }

  public async findOne(id: string): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne(id);

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

  public async findDeletedEntity(id: string): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne(id, { withDeleted: true });

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
