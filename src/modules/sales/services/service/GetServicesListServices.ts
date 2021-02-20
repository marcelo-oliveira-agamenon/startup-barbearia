import { injectable, inject } from 'tsyringe';

import IServiceRepository from '@modules/sales/repositories/IServiceRepository';

import Service from '@modules/sales/infra/typeorm/entities/Service';

import { IListServicesDTO } from '@modules/sales/dtos/IServicesDTO';

@injectable()
export default class GetServicesListService {
  constructor(
    @inject('ServiceRepository')
    private serviceRepository: IServiceRepository
  ) {}

  public async execute(query: IListServicesDTO): Promise<Service[]> {
    const services = await this.serviceRepository.findAll(query);

    return services;
  }
}
