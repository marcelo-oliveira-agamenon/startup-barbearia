import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';

import { User } from '@modules/users/infra/typeorm/entities/User';

import { IUpdateUserDTO } from '@modules/users/dtos/IUserDTO';

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute(
    data: IUpdateUserDTO,
    user_id: string
  ): Promise<User | undefined> {
    const userExists = await this.userRepository.findOne(user_id);
    if (!userExists) throw new Error('User does not exist!');

    if (data.email) {
      if (data.email != userExists.email) {
        const emailExists = await this.userRepository.findByEmail(data.email);
        if (emailExists)
          throw new Error('This email already belongs to another user!');
      }
    }
    if (data.cpf) {
      if (data.cpf != userExists.cpf) {
        const cpfExists = await this.userRepository.findByCpf(data.cpf);
        if (cpfExists)
          throw new Error('This cpf already belongs to another user!');
      }
    }
    delete data.confirmPassword;
    const isUserUpdated = await this.userRepository.update(
      userExists.user_id,
      data
    );
    if (!isUserUpdated) throw new Error('User has not been updated!');

    const user = await this.userRepository.findOne(user_id);

    return user;
  }
}
