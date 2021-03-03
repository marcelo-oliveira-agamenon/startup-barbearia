import { injectable, inject } from 'tsyringe';

import IServiceRepository from '@modules/sales/repositories/IServiceRepository';

import Service from '@modules/sales/infra/typeorm/entities/Service';

import { IGetServiceDTO } from '@modules/sales/dtos/IServiceDTO';

import AppError from '@shared/errors/AppError';

import AppError from '@shared/errors/AppError';

@injectable()
export default class GetServiceService {
  constructor(
    @inject('ServiceRepository')
    private serviceRepository: IServiceRepository
  ) {}

  public async execute({
    service_id
  }: IGetServiceDTO): Promise<Service | undefined> {
    const service = await this.serviceRepository.findOne(service_id);
    if (!service) throw new AppError('Service does not found!');

    return service;
  }
}
