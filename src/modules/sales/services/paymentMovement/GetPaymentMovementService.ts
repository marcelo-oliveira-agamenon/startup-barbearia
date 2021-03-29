import { IGetPaymentMovementDTO } from '@modules/sales/dtos/IPaymentMovementDTO';
import PaymentMovement from '@modules/sales/infra/typeorm/entities/PaymentMovement';
import IPaymentMovementRepository from '@modules/sales/repositories/IPaymentMovementRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetPaymentMovementService {
  constructor(
    @inject('PaymentMovementRepository')
    private paymentMovementRepository: IPaymentMovementRepository
  ) {}

  public async execute({
    payment_movement_id
  }: IGetPaymentMovementDTO): Promise<PaymentMovement> {
    const paymentMovement = await this.paymentMovementRepository.findOne(
      payment_movement_id
    );
    if (!paymentMovement)
      throw new AppError('Payment Movement does not exist!');

    return paymentMovement;
  }
}
