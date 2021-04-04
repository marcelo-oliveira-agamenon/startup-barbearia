import PaymentMethod from '@modules/sales/infra/typeorm/entities/PaymentMethod';
import {
  ICreatePaymentMethodDTO,
  IListPaymentMethodsDTO
} from '@modules/sales/dtos/IPaymentMethodDTO';

export default interface IPaymentMethodRepository {
  create(data: ICreatePaymentMethodDTO): Promise<PaymentMethod>;
  update(entity: PaymentMethod): Promise<PaymentMethod>;
  deleteByEntity(entity: PaymentMethod): Promise<PaymentMethod>;
  findByName(name: string): Promise<PaymentMethod | undefined>;
  findAll(query: IListPaymentMethodsDTO): Promise<PaymentMethod[]>;
  findById(payment_method_id: number): Promise<PaymentMethod | undefined>;
}
