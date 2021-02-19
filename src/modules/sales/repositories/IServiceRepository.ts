import Service from '@modules/sales/infra/typeorm/entities/Service';
import {
  ICreateServicesDTO,
  IListServicesDTO,
  IDeleteServicesDTO,
  IUpdateServicesDTO
} from '@modules/sales/dtos/IServicesDTO';

export default interface IServiceRepository {
  create(data: ICreateServicesDTO): Promise<number>;
  findOne(id: number): Promise<Service | undefined>;
  findAll(query: IListServicesDTO): Promise<Service[]>;
  delete({ service_id }: IDeleteServicesDTO): Promise<number | undefined>;
  findDeletedEntity(id: number): Promise<Service | undefined>;
  update(id: number, data: IUpdateServicesDTO): Promise<Service>;
}
