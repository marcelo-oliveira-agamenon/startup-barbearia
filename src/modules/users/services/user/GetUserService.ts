import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';

import { User } from '@modules/users/infra/typeorm/entities/User';

import { IGetUserDTO } from '@modules/users/dtos/IUserDTO';

@injectable()
export default class GetUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute({ user_id }: IGetUserDTO): Promise<User | undefined> {
    const user = await this.userRepository.findOne(user_id);
    if (!user) throw new Error('User does not exist!');

    return user;
  }
}
