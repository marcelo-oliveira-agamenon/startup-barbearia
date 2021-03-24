import { injectable, inject } from 'tsyringe';

import IServiceRepository from '@modules/sales/repositories/IServiceRepository';

import Service from '@modules/sales/infra/typeorm/entities/Service';

import { IListServicesDTO } from '@modules/sales/dtos/IServiceDTO';

@injectable()
export class ListServicesUserService {
  constructor(
    @inject('ServiceRepository')
    private serviceRepository: IServiceRepository
  ) {}

  public async execute(query: IListServicesDTO): Promise<Service[]> {
    const services = await this.serviceRepository.findAllWithUser(query);

    return services;
  }
}
