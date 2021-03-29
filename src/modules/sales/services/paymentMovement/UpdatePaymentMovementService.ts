import { IUpdatePaymentMovementDTO } from '@modules/sales/dtos/IPaymentMovementDTO';
import PaymentMovement from '@modules/sales/infra/typeorm/entities/PaymentMovement';
import IPaymentMovementRepository from '@modules/sales/repositories/IPaymentMovementRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UpdatePaymentMovementService {
  constructor(
    @inject('PaymentMovementRepository')
    private paymentMovementRepository: IPaymentMovementRepository
  ) {}

  public async execute(
    payment_movement_id: string,
    data: IUpdatePaymentMovementDTO
  ): Promise<PaymentMovement> {
    const paymentMovementExists = await this.paymentMovementRepository.findOne(
      payment_movement_id
    );
    if (!paymentMovementExists)
      throw new AppError('Payment Movement does not exist!');

    const paymentMovementEntity = Object.assign(paymentMovementExists, data);

    const paymentMovement = await this.paymentMovementRepository.update(
      paymentMovementEntity
    );

    return paymentMovement;
  }
}
