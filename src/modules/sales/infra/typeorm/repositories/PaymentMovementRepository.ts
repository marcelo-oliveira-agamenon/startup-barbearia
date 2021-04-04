import {
  ICreatePaymentMovementDTO,
  IDeletePaymentMovementDTO,
  IListPaymentMovementsDTO
} from '@modules/sales/dtos/IPaymentMovementDTO';
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

  public async findOne(
    payment_movement_id: string
  ): Promise<PaymentMovement | undefined> {
    const paymentMovement = await this.ormRepository.findOne(
      payment_movement_id,
      { loadRelationIds: true }
    );

    return paymentMovement;
  }

  public async update(entity: PaymentMovement): Promise<PaymentMovement> {
    const paymentMovement = await this.ormRepository.save(entity);

    return paymentMovement;
  }

  public async deleteById({
    payment_movement_id
  }: IDeletePaymentMovementDTO): Promise<number | null | undefined> {
    const paymentMovement = await this.ormRepository.delete(
      payment_movement_id
    );
    const isAffected = paymentMovement.affected;

    return isAffected;
  }

  public async findAll(
    query: IListPaymentMovementsDTO
  ): Promise<PaymentMovement[]> {
    const { limit, offset } = query;
    const take = limit ? limit : 0,
      skip = offset ? offset : 0;

    const paymentMovements = await this.ormRepository.find({
      take,
      skip,
      loadRelationIds: true
    });

    return paymentMovements;
  }
}
