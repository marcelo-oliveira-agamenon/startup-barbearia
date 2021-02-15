import { User } from '@modules/users/infra/typeorm/entities/User';
import { ICreateUserDTO, IUpdateUserDTO } from '@modules/users/dtos/IUserDTO';

export default interface IUserRepository {
  create(data: ICreateUserDTO): Promise<string>;
  update(user_id: string, data: IUpdateUserDTO): Promise<number | undefined>;
  findOne(id: string): Promise<User | undefined>;
  findByCpf(id: string): Promise<User | undefined>;
  findByEmail(id: string): Promise<User | undefined>;
}
