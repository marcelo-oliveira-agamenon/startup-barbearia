import { getRepository, Repository } from 'typeorm';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import { User } from '@modules/users/infra/typeorm/entities/User';
import {
  ICreateUserDTO,
  IDeleteUserDTO,
  IListUsersDTO
} from '@modules/users/dtos/IUserDTO';

export default class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const userInstance = this.ormRepository.create(data);
    const user = await this.ormRepository.save(userInstance);
    return user;
  }

  public async update(userEntity: User): Promise<User> {
    const user = await this.ormRepository.save(userEntity);

    return user;
  }

  public async delete({
    user_id
  }: IDeleteUserDTO): Promise<number | undefined> {
    const isUserDeleted = await this.ormRepository.softDelete(user_id);
    const isUserAffected = isUserDeleted.affected;

    return isUserAffected;
  }

  public async findOne(user_id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(user_id);

    return user;
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ cpf });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ email });

    return user;
  }

  public async findDeletedEntity(user_id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(user_id, {
      withDeleted: true
    });

    return user;
  }

  public async isEmailRegistered(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
      select: ['user_id', 'password', 'user_type']
    });

    return user;
  }

  public async findAll(query: IListUsersDTO): Promise<User[]> {
    const { limit, offset } = query;
    const take = limit ? limit : 0,
      skip = offset ? offset : 0;

    const users = await this.ormRepository.find({ take, skip });

    return users;
  }
}
