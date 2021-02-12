import Service from '@modules/sales/infra/typeorm/entities/Service';
import { ICreateServicesDTO } from '@modules/sales/dtos/IServicesDTO';

export default interface IServiceRepository {
  create(data: ICreateServicesDTO): Promise<number>;
  findOne(id: number): Promise<Service | undefined>;
}
