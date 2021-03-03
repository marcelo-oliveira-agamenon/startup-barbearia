import { injectable, inject } from 'tsyringe';

import IServiceRepository from '@modules/sales/repositories/IServiceRepository';

import Service from '@modules/sales/infra/typeorm/entities/Service';

import { IDeleteServicesDTO } from '@modules/sales/dtos/IServiceDTO';

import AppError from '@shared/errors/AppError';

import AppError from '@shared/errors/AppError';

@injectable()
export default class DeleteServicesService {
  constructor(
    @inject('ServiceRepository')
    private serviceRepository: IServiceRepository
  ) {}

  public async execute({
    service_id
  }: IDeleteServicesDTO): Promise<Service | undefined> {
    const serviceExists = await this.serviceRepository.findOne(service_id);
    if (!serviceExists) throw new AppError('Service does not exist!');

    const serviceDelete = await this.serviceRepository.delete({ service_id });
    if (!serviceDelete) throw new AppError('Service has not been deleted!');

    const user = await this.serviceRepository.findDeletedEntity(service_id);

    return user;
  }
}
