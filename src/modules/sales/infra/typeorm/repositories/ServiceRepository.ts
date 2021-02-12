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
    const serviceInserted = await this.ormRepository.insert(data);
    const service_id = serviceInserted.identifiers[0].user_id;
    return service_id;
  }

  public async findOne(id: number): Promise<Service | undefined> {
    const service = await this.ormRepository.findOne(id);

    return service;
  }
}
