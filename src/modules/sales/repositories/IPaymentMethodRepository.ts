import PaymentMethod from '@modules/sales/infra/typeorm/entities/PaymentMethod';
import { ICreatePaymentMethodDTO } from '@modules/sales/dtos/IPaymentMethodDTO';

export default interface IServiceRepository {
  create(data: ICreatePaymentMethodDTO): Promise<PaymentMethod>;
  findByName(name: string): Promise<PaymentMethod | undefined>;
  // findAll(query: IListServicesDTO): Promise<PaymentMethod[]>;
  // delete({ service_id }: IDeleteServicesDTO): Promise<number | undefined>;
  // update(id: number, data: IUpdateServicesDTO): Promise<PaymentMethod>;
}
