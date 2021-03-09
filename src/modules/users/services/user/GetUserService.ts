import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';

import { User } from '@modules/users/infra/typeorm/entities/User';

import { IGetUserDTO } from '@modules/users/dtos/IUserDTO';

import AppError from '@shared/errors/AppError';

@injectable()
export class GetUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute({ user_id }: IGetUserDTO): Promise<User> {
    const user = await this.userRepository.findOne(user_id);
    if (!user) throw new AppError('User does not exist!');

    return user;
  }
}
