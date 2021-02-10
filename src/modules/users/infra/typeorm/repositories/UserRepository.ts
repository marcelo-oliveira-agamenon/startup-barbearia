import { getRepository, Repository } from 'typeorm';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { ICreateUserDTO } from '@modules/users/dtos/IUserDTO';

import { AppError } from '@shared/errors/AppError';

export default class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    try {
      const user = await this.ormRepository.save(data);

      return user;
    } catch (error) {
      throw new AppError(500, 'quebrou repo');
    }
  }
}
