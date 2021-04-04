import { injectable, inject } from 'tsyringe';

import IPaymentMethodRepository from '@modules/sales/repositories/IPaymentMethodRepository';

import PaymentMethod from '@modules/sales/infra/typeorm/entities/PaymentMethod';

import { IDeletePaymentMethodDTO } from '@modules/sales/dtos/IPaymentMethodDTO';
import AppError from '@shared/errors/AppError';

@injectable()
export class DeletePaymentMethodService {
  constructor(
    @inject('PaymentMethodRepository')
    private serviceRepository: IPaymentMethodRepository
  ) {}

  public async execute(
    params: IDeletePaymentMethodDTO
  ): Promise<PaymentMethod> {
    const { payment_method_id } = params;
    const paymentMethodExists = await this.serviceRepository.findById(
      payment_method_id
    );
    if (!paymentMethodExists)
      throw new AppError('This payment method does not exist!');

    const paymentMethod = await this.serviceRepository.deleteByEntity(
      paymentMethodExists
    );

    return paymentMethod;
  }
}
