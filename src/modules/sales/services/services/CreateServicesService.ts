import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';

import { User } from '@modules/users/infra/typeorm/entities/User';

import { ICreateUserDTO } from '@modules/users/dtos/IUserDTO';

import { AppError } from '@shared/errors/AppError';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute(data: ICreateUserDTO): Promise<User> {
    const user = await this.userRepository.create(data);
    if (!user) {
      throw new AppError(500, 'quebrou');
    }

    return user;
  }
}
