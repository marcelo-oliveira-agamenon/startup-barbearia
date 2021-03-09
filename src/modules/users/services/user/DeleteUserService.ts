import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';

import { User } from '@modules/users/infra/typeorm/entities/User';

import { IDeleteUserDTO } from '@modules/users/dtos/IUserDTO';

import AppError from '@shared/errors/AppError';

@injectable()
export class DeleteUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute({ user_id }: IDeleteUserDTO): Promise<User | undefined> {
    const userExists = await this.userRepository.findOne(user_id);
    if (!userExists) throw new AppError('User does not exist!');

    const isUserDeleted = await this.userRepository.delete({ user_id });
    if (!isUserDeleted) throw new AppError('User has not been deleted!');

    const user = await this.userRepository.findDeletedEntity(user_id);

    return user;
  }
}
