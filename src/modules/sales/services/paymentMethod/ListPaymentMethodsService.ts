import { injectable, inject } from 'tsyringe';

import IPaymentMethodRepository from '@modules/sales/repositories/IPaymentMethodRepository';

import PaymentMethod from '@modules/sales/infra/typeorm/entities/PaymentMethod';

import { IListPaymentMethodsDTO } from '@modules/sales/dtos/IPaymentMethodDTO';

@injectable()
export default class ListPaymentMethodsService {
  constructor(
    @inject('PaymentMethodRepository')
    private serviceRepository: IPaymentMethodRepository
  ) {}

  public async execute(
    query: IListPaymentMethodsDTO
  ): Promise<PaymentMethod[]> {
    const paymentMethods = await this.serviceRepository.findAll(query);

    return paymentMethods;
  }
}
