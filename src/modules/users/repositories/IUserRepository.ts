import { User } from '@modules/users/infra/typeorm/entities/User';
import {
  ICreateUserDTO,
  IDeleteUserDTO,
  IListUsersDTO
} from '@modules/users/dtos/IUserDTO';

export default interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  update(userEntity: User): Promise<User>;
  delete({ user_id }: IDeleteUserDTO): Promise<number | undefined>;
  findOne(user_id: string): Promise<User | undefined>;
  findByCpf(cpf: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findDeletedEntity(user_id: string): Promise<User | undefined>;
  findAll(query: IListUsersDTO): Promise<User[]>;
  isEmailRegistered(email: string): Promise<User | undefined>;
}
