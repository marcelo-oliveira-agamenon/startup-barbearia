import { ICreatePaymentMovementDTO } from '@modules/sales/dtos/IPaymentMovementDTO';
import IPaymentMovementRepository from '@modules/sales/repositories/IPaymentMovementRepository';
import { getRepository, Repository } from 'typeorm';
import PaymentMovement from '../entities/PaymentMovement';

export default class PaymenthMovementRepository
  implements IPaymentMovementRepository {
  private ormRepository: Repository<PaymentMovement>;

  constructor() {
    this.ormRepository = getRepository(PaymentMovement);
  }

  public async create(
    data: ICreatePaymentMovementDTO
  ): Promise<PaymentMovement> {
    const paymentMethodInstance = this.ormRepository.create(data);
    const paymentMethod = await this.ormRepository.save(paymentMethodInstance);

    return paymentMethod;
  }
  // update(entity: PaymentMethod): Promise<PaymentMethod> {
  //   throw new Error('Method not implemented.');
  // }
  // deleteById(payment_method_id: number): Promise<number | null | undefined> {
  //   throw new Error('Method not implemented.');
  // }
  // findAll(query: IListPaymentMethodsDTO): Promise<PaymentMethod[]> {
  //   throw new Error('Method not implemented.');
  // }
  // findById(payment_method_id: number): Promise<PaymentMethod | undefined> {
  //   throw new Error('Method not implemented.');
  // }
}
