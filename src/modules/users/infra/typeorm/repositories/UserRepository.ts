import { getRepository, Repository } from 'typeorm';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import { User } from '@modules/users/infra/typeorm/entities/User';
import {
  ICreateUserDTO,
  IUpdateUserDTO,
  IDeleteUserDTO
} from '@modules/users/dtos/IUserDTO';

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

  public async update(
    user_id: string,
    data: IUpdateUserDTO
  ): Promise<number | undefined> {
    const isUserUpdated = await this.ormRepository.update(user_id, data);
    const isUserAffected = isUserUpdated.affected;
    return isUserAffected;
  }

  public async findOne(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

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

  public async findDeletedEntity(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id, { withDeleted: true });

    return user;
  }

  public async delete({
    user_id
  }: IDeleteUserDTO): Promise<number | undefined> {
    const isUserDeleted = await this.ormRepository.softDelete(user_id);
    const isUserAffected = isUserDeleted.affected;

    return isUserAffected;
  }
}
