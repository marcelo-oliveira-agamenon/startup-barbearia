import { getRepository, Repository } from 'typeorm';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import User from '@modules/users/infra/typeorm/entities/User';

export default class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(data: User): Promise<User> {
    const user = this.ormRepository.create(data);

    return user;
  }
}
