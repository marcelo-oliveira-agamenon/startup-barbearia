import { getRepository, Repository } from 'typeorm';
import IServicesRepository from '@modules/sales/repositories/IServicesRepository';
import { Services } from '@modules/sales/infra/typeorm/entities/Services';
import { ICreateServicesDTO } from '@modules/sales/dtos/IServicesDTO';

import { AppError } from '@shared/errors/AppError';

export default class ServicesRepository implements IServicesRepository {
  private ormRepository: Repository<Services>;

  constructor() {
    this.ormRepository = getRepository(Services);
  }

  public async create(data: ICreateServicesDTO): Promise<Services> {
    try {
      const services = await this.ormRepository.save(data);

      return services;
    } catch (error) {
      throw new AppError(500, 'quebrou repo');
    }
  }
}
