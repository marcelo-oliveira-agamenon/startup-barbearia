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

  public async create(data: ICreateUserDTO): Promise<string> {
    const userInserted = await this.ormRepository.insert(data);
    const user_id = userInserted.identifiers[0].user_id;
    return user_id;
  }

  public async findOne(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }
}
