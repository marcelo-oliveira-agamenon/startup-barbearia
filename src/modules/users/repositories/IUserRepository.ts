import { User } from '@modules/users/infra/typeorm/entities/User';
import {
  ICreateUserDTO,
  IUpdateUserDTO,
  IDeleteUserDTO,
  IListUsersDTO
} from '@modules/users/dtos/IUserDTO';

export default interface IUserRepository {
  create(data: ICreateUserDTO): Promise<string>;
  update(user_id: string, data: IUpdateUserDTO): Promise<number | undefined>;
  delete({ user_id }: IDeleteUserDTO): Promise<number | undefined>;
  findOne(id: string): Promise<User | undefined>;
  findByCpf(cpf: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findDeletedEntity(id: string): Promise<User | undefined>;
  findAll(query: IListUsersDTO): Promise<User[]>;
}
