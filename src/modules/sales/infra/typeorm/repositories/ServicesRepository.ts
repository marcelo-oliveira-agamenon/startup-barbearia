import { getRepository, Repository } from 'typeorm';
import IServicesRepository from '@modules/sales/repositories/IServicesRepository';
import { Service } from '@modules/sales/infra/typeorm/entities/Service';
import { ICreateServicesDTO } from '@modules/sales/dtos/IServicesDTO';

export default class ServicesRepository implements IServicesRepository {
  private ormRepository: Repository<Service>;

  constructor() {
    this.ormRepository = getRepository(Service);
  }

  public async create(data: ICreateServicesDTO): Promise<Service> {
    const services = await this.ormRepository.save(data);

    return services;
  }
}
