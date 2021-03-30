import { IListPaymentMovementsDTO } from '@modules/sales/dtos/IPaymentMovementDTO';
import PaymentMovement from '@modules/sales/infra/typeorm/entities/PaymentMovement';
import IPaymentMovementRepository from '@modules/sales/repositories/IPaymentMovementRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListPaymentMovementsService {
  constructor(
    @inject('PaymentMovementRepository')
    private serviceRepository: IPaymentMovementRepository
  ) {}

  public async execute(
    query: IListPaymentMovementsDTO
  ): Promise<PaymentMovement[]> {
    const paymentMovements = await this.serviceRepository.findAll(query);

    return paymentMovements;
  }
}
