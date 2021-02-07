import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';

import User from '@modules/users/infra/typeorm/entities/User';

import { ICreateUserDTO } from '@modules/users/dtos/IUserDTO';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute(data: ICreateUserDTO): Promise<User> {
    const user = await this.userRepository.create(data);

    return user;
  }
}
