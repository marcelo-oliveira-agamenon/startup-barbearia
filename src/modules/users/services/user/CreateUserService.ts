import { injectable, inject } from 'tsyringe';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import User from '@modules/users/infra/typeorm/entities/User';

@injectable()
export default class ExampleService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute(data: string): Promise<User> {
    const user = await this.userRepository.create({});

    return user;
  }
}
