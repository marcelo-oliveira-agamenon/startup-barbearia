import { getRepository, Repository } from 'typeorm';
import IServiceRepository from '@modules/sales/repositories/IServiceRepository';
import Service from '@modules/sales/infra/typeorm/entities/Service';
import { ICreateServicesDTO } from '@modules/sales/dtos/IServicesDTO';

export default class ServiceRepository implements IServiceRepository {
  private ormRepository: Repository<Service>;

  constructor() {
    this.ormRepository = getRepository(Service);
  }

  public async create(data: ICreateServicesDTO): Promise<number> {
    const userInserted = await this.ormRepository.insert(data);
    const user_id = userInserted.identifiers[0].user_id;
    return user_id;
  }

  public async findOne(id: number): Promise<Service | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }
}
