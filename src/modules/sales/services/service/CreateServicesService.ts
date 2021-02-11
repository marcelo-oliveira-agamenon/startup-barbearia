import { injectable, inject } from 'tsyringe';

import IServicesRepository from '@modules/sales/repositories/IServicesRepository';

import { Service } from '@modules/sales/infra/typeorm/entities/Service';

import { ICreateServicesDTO } from '@modules/sales/dtos/IServicesDTO';

import { AppError } from '@shared/errors/AppError';

@injectable()
export default class CreateServiceServices {
  constructor(
    @inject('ServicesRepository')
    private serviceRepository: IServicesRepository
  ) {}

  public async execute(data: ICreateServicesDTO): Promise<Service> {
    const service = await this.serviceRepository.create(data);
    if (!service) {
      throw new AppError(500, 'quebrou');
    }

    return service;
  }
}
