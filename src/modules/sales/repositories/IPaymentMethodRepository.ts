import PaymentMethod from '@modules/sales/infra/typeorm/entities/PaymentMethod';
import {
  ICreatePaymentMethodDTO,
  IListPaymentMethodsDTO,
  IGetPaymentMethodDTO
} from '@modules/sales/dtos/IPaymentMethodDTO';

export default interface IServiceRepository {
  create(data: ICreatePaymentMethodDTO): Promise<PaymentMethod>;
  findByName(name: string): Promise<PaymentMethod | undefined>;
  findAll(query: IListPaymentMethodsDTO): Promise<PaymentMethod[]>;
  findById(query: IGetPaymentMethodDTO): Promise<PaymentMethod | undefined>;

  // delete({ service_id }: IDeleteServicesDTO): Promise<number | undefined>;
  // update(id: number, data: IUpdateServicesDTO): Promise<PaymentMethod>;
}
