import User from '@modules/users/infra/typeorm/entities/User';

export default interface IExampleRepository {
  create(data: User): Promise<User>;
}
