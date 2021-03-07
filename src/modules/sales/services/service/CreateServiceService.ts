import { injectable, inject } from 'tsyringe';

import IServiceRepository from '@modules/sales/repositories/IServiceRepository';

import Service from '@modules/sales/infra/typeorm/entities/Service';

import { ICreateServicesDTO } from '@modules/sales/dtos/IServiceDTO';

import AppError from '@shared/errors/AppError';

@injectable()
export class CreateServiceService {
  constructor(
    @inject('ServiceRepository')
    private serviceRepository: IServiceRepository
  ) {}

  public async execute(data: ICreateServicesDTO): Promise<Service | undefined> {
    const service_id = await this.serviceRepository.create(data);
    if (!service_id) {
      throw new AppError('Service has not been created!');
    }
    const service = await this.serviceRepository.findOne(service_id);

    return service;
  }
}
