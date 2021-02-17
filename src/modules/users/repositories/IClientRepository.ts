import { Client } from '@modules/users/infra/typeorm/entities/Client';
import { ICreateClientDTO } from '@modules/users/dtos/IClientDTO';
import { UpdateResult } from 'typeorm';

export default interface IClientRepository {
  create(data: ICreateClientDTO): Promise<string>;
  findOne(id: string): Promise<Client | undefined>;
  // delete(data: ICreateClientDTO): Promise<UpdateResult>;
}
