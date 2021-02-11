import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';

import { User } from '@modules/users/infra/typeorm/entities/User';

import { ICreateUserDTO } from '@modules/users/dtos/IUserDTO';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute(data: ICreateUserDTO): Promise<User | undefined> {
    const user_id = await this.userRepository.create(data);
    if (!user_id) throw new Error('User has not been created!');
    const user = await this.userRepository.findOne(user_id);

    return user;
  }
}
