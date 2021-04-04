import { injectable, inject } from 'tsyringe';

import IPaymentMethodRepository from '@modules/sales/repositories/IPaymentMethodRepository';

import PaymentMethod from '@modules/sales/infra/typeorm/entities/PaymentMethod';

import { IUpdatePaymentMethodDTO } from '@modules/sales/dtos/IPaymentMethodDTO';
import AppError from '@shared/errors/AppError';

@injectable()
export class UpdatePaymentMethodService {
  constructor(
    @inject('PaymentMethodRepository')
    private serviceRepository: IPaymentMethodRepository
  ) {}

  public async execute(
    params: IUpdatePaymentMethodDTO
  ): Promise<PaymentMethod> {
    const { payment_method_id, ...data } = params;
    const paymentMethodExists = await this.serviceRepository.findById(
      payment_method_id
    );

    if (!paymentMethodExists)
      throw new AppError('This payment method does not exist!');

    const paymentMethod = await this.serviceRepository.update(
      Object.assign({}, paymentMethodExists, data)
    );

    return paymentMethod;
  }
}
