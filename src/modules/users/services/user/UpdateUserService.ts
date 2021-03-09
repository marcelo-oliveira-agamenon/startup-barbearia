import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';

import { User } from '@modules/users/infra/typeorm/entities/User';

import { IUpdateUserDTO } from '@modules/users/dtos/IUserDTO';

import AppError from '@shared/errors/AppError';

@injectable()
export class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute(data: IUpdateUserDTO, user_id: string): Promise<User> {
    const userExists = await this.userRepository.findOne(user_id);
    if (!userExists) throw new AppError('User does not exist!');

    if (data.email) {
      if (data.email != userExists.email) {
        const emailExists = await this.userRepository.findByEmail(data.email);
        if (emailExists)
          throw new AppError('This email already belongs to another user!');
      }
    }
    if (data.cpf) {
      if (data.cpf != userExists.cpf) {
        const cpfExists = await this.userRepository.findByCpf(data.cpf);
        if (cpfExists)
          throw new AppError('This cpf already belongs to another user!');
      }
    }
    delete data.confirmPassword;
    const user = await this.userRepository.update(userExists.user_id, data);

    return user;
  }
}
