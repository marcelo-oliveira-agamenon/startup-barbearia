import { Services } from '@modules/sales/infra/typeorm/entities/Services';
import { ICreateServicesDTO } from '@modules/sales/dtos/IServicesDTO';

export default interface IServicesRepository {
  create(data: ICreateServicesDTO): Promise<Services>;
}
