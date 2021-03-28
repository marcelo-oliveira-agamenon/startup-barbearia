import { IDeletePaymentMovementDTO } from '@modules/sales/dtos/IPaymentMovementDTO';
import PaymentMovement from '@modules/sales/infra/typeorm/entities/PaymentMovement';
import IPaymentMovementRepository from '@modules/sales/repositories/IPaymentMovementRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export class DeletePaymentMovementService {
  constructor(
    @inject('PaymentMovementRepository')
    private paymentMovementRepository: IPaymentMovementRepository
  ) {}

  public async execute(
    params: IDeletePaymentMovementDTO
  ): Promise<PaymentMovement> {
    const { payment_movement_id } = params;
    const paymentMovementExists = await this.paymentMovementRepository.findOne(
      payment_movement_id
    );

    if (!paymentMovementExists)
      throw new AppError('This payment movement does not exist!');

    const isPaymentMovementDeleted = await this.paymentMovementRepository.deleteById(
      { payment_movement_id }
    );
    if (!isPaymentMovementDeleted)
      throw new AppError(
        'Somethign went wrong! This payment movement has not been deleted!'
      );

    return paymentMovementExists;
  }
}
