import Client from '@modules/users/infra/typeorm/entities/Client';
import {
  ICreateClientDTO,
  IDeleteClientDTO,
  IListClientsDTO
} from '@modules/users/dtos/IClientDTO';

export default interface IClientRepository {
  create(data: ICreateClientDTO): Promise<Client>;
  findOne(client_id: string): Promise<Client | undefined>;
  update(clientEntity: Client): Promise<Client>;
  delete({ client_id }: IDeleteClientDTO): Promise<number | undefined>;
  findByCpf(cpf: string): Promise<Client | undefined>;
  findByEmail(email: string): Promise<Client | undefined>;
  findDeletedEntity(client_id: string): Promise<Client | undefined>;
  findAll(query: IListClientsDTO): Promise<Client[]>;
}
