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
    const serviceExists = await this.serviceRepository.findByName(data.name);
    if (serviceExists) throw new AppError('Service name already exists!');

    const service = await this.serviceRepository.create(data);
    if (!service) throw new AppError('Service has not been created!');

    return service;
  }
}
