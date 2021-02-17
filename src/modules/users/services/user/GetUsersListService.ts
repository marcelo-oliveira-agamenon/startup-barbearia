import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';

import { User } from '@modules/users/infra/typeorm/entities/User';

import { IListUsersDTO } from '@modules/users/dtos/IUserDTO';

@injectable()
export default class GetUsersListService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute(query: IListUsersDTO): Promise<User[]> {
    const users = await this.userRepository.findAll(query);

    return users;
  }
}
