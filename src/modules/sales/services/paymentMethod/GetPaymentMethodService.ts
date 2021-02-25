import { injectable, inject } from 'tsyringe';

import IPaymentMethodRepository from '@modules/sales/repositories/IPaymentMethodRepository';

import PaymentMethod from '@modules/sales/infra/typeorm/entities/PaymentMethod';

import { IGetPaymentMethodDTO } from '@modules/sales/dtos/IPaymentMethodDTO';
import AppError from '@shared/errors/AppError';

@injectable()
export default class ListPaymentMethodsService {
  constructor(
    @inject('PaymentMethodRepository')
    private serviceRepository: IPaymentMethodRepository
  ) {}

  public async execute(params: IGetPaymentMethodDTO): Promise<PaymentMethod> {
    const paymentMethod = await this.serviceRepository.findById(params);

    if (!paymentMethod)
      throw new AppError('This payment method does not exist!');

    return paymentMethod;
  }
}
