import Service from '@modules/sales/infra/typeorm/entities/Service';
import {
  ICreateServicesDTO,
  IListServicesDTO,
  IDeleteServicesDTO,
  IUpdateServicesDTO
} from '@modules/sales/dtos/IServicesDTO';

export default interface IServiceRepository {
  create(data: ICreateServicesDTO): Promise<number>;
  findOne(id: string): Promise<Service | undefined>;
  findAll(query: IListServicesDTO): Promise<Service[]>;
  delete({ service_id }: IDeleteServicesDTO): Promise<number | undefined>;
  findDeletedEntity(id: string): Promise<Service | undefined>;
  update(id: string, data: IUpdateServicesDTO): Promise<Service>;
}
