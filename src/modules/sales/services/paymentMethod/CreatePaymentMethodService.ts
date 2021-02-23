import { injectable, inject } from 'tsyringe';

import IPaymentMethodRepository from '@modules/sales/repositories/IPaymentMethodRepository';

import PaymentMethod from '@modules/sales/infra/typeorm/entities/PaymentMethod';

import { ICreatePaymentMethodDTO } from '@modules/sales/dtos/IPaymentMethodDTO';

import AppError from '@shared/errors/AppError';

@injectable()
export default class CreatePaymentMethodService {
  constructor(
    @inject('PaymentMethodRepository')
    private paymentMethodRepository: IPaymentMethodRepository
  ) {}

  public async execute(
    data: ICreatePaymentMethodDTO
  ): Promise<PaymentMethod | undefined> {
    const paymentMethodExists = await this.paymentMethodRepository.findByName(
      data.name
    );
    if (paymentMethodExists)
      throw new AppError('This payment method already exists!');
    const paymentMethod = await this.paymentMethodRepository.create(data);

    return paymentMethod;
  }
}
