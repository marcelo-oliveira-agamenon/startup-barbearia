import { Client } from '@modules/users/infra/typeorm/entities/Client';
import { ICreateClientDTO } from '@modules/users/dtos/IClientDTO';

export default interface IClientRepository {
  create(data: ICreateClientDTO): Promise<Client>;
}
