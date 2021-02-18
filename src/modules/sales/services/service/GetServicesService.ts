import { injectable, inject } from 'tsyringe';

import IServiceRepository from '@modules/sales/repositories/IServiceRepository';

import Service from '@modules/sales/infra/typeorm/entities/Service';

import { IGetServiceDTO } from '@modules/sales/dtos/IServicesDTO';

@injectable()
export default class GetServicesService {
  constructor(
    @inject('ServiceRepository')
    private serviceRepository: IServiceRepository
  ) {}

  public async execute({
    service_id
  }: IGetServiceDTO): Promise<Service | undefined> {
    const services = await this.serviceRepository.findOne(service_id);

    return services;
  }
}
