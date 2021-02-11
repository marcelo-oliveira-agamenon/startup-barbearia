import { Service } from '@modules/sales/infra/typeorm/entities/Service';
import { ICreateServicesDTO } from '@modules/sales/dtos/IServicesDTO';

export default interface IServicesRepository {
  create(data: ICreateServicesDTO): Promise<Service>;
}
