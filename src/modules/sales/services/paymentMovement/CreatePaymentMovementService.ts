import { ICreatePaymentMovementDTO } from '@modules/sales/dtos/IPaymentMovementDTO';
import PaymentMovement from '@modules/sales/infra/typeorm/entities/PaymentMovement';
import IPaymentMovementRepository from '@modules/sales/repositories/IPaymentMovementRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreatePaymentMovementService {
  constructor(
    @inject('PaymentMovementRepository')
    private paymentMovementRepository: IPaymentMovementRepository
  ) {}

  public async execute(
    data: ICreatePaymentMovementDTO
  ): Promise<PaymentMovement | undefined> {
    const paymentMovement = await this.paymentMovementRepository.create(data);

    return paymentMovement;
  }
}
