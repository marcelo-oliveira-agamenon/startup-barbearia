import { injectable, inject } from 'tsyringe';

import IServiceRepository from '@modules/sales/repositories/IServiceRepository';

import Service from '@modules/sales/infra/typeorm/entities/Service';

import { IUpdateServicesDTO } from '@modules/sales/dtos/IServiceDTO';

import AppError from '@shared/errors/AppError';

@injectable()
export default class UpdateServicesService {
  constructor(
    @inject('ServiceRepository')
    private serviceRepository: IServiceRepository
  ) {}

  public async execute(
    data: IUpdateServicesDTO,
    service_id: number
  ): Promise<Service> {
    const serviceExists = await this.serviceRepository.findOne(service_id);
    if (!serviceExists) throw new AppError('Service does not exist!');

    const service = await this.serviceRepository.update(service_id, data);

    return service;
  }
}
