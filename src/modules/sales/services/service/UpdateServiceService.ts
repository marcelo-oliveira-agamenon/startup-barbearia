import { injectable, inject } from 'tsyringe';

import IServiceRepository from '@modules/sales/repositories/IServiceRepository';

import Service from '@modules/sales/infra/typeorm/entities/Service';

import { IUpdateServicesDTO } from '@modules/sales/dtos/IServiceDTO';

import AppError from '@shared/errors/AppError';

@injectable()
export class UpdateServiceService {
  constructor(
    @inject('ServiceRepository')
    private serviceRepository: IServiceRepository
  ) {}

  public async execute(
    service_id: string,
    data: IUpdateServicesDTO
  ): Promise<Service> {
    const serviceExists = await this.serviceRepository.findOne(service_id);
    if (!serviceExists) throw new AppError('Service does not exist!');

    const serviceEntity = Object.assign(serviceExists, data);

    const service = await this.serviceRepository.update(serviceEntity);

    return service;
  }
}
