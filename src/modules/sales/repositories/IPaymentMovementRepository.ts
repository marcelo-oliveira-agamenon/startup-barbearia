import {
  ICreatePaymentMovementDTO,
  IDeletePaymentMovementDTO,
  IListPaymentMovementsDTO
} from '../dtos/IPaymentMovementDTO';
import PaymentMovement from '../infra/typeorm/entities/PaymentMovement';

export default interface IPaymentMovementRepository {
  create(data: ICreatePaymentMovementDTO): Promise<PaymentMovement>;
  findOne(payment_movement_id: string): Promise<PaymentMovement | undefined>;
  update(PaymentMovementEntity: PaymentMovement): Promise<PaymentMovement>;
  deleteById({
    payment_movement_id
  }: IDeletePaymentMovementDTO): Promise<number | null | undefined>;
  // findDeletedEntity(payment_movement_id: string): Promise<PaymentMovement | undefined>;
  findAll(query: IListPaymentMovementsDTO): Promise<PaymentMovement[]>;
}
