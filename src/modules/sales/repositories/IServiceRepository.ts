import Service from '@modules/sales/infra/typeorm/entities/Service';
import {
  ICreateServicesDTO,
  IListServicesDTO,
  IDeleteServicesDTO,
  IUpdateServicesDTO
} from '@modules/sales/dtos/IServiceDTO';

export default interface IServiceRepository {
  create(data: ICreateServicesDTO): Promise<Service>;
  delete({ service_id }: IDeleteServicesDTO): Promise<number | undefined>;
  update(id: number, data: IUpdateServicesDTO): Promise<Service>;
  findOne(id: number): Promise<Service | undefined>;
  findAll(query: IListServicesDTO): Promise<Service[]>;
  findByName(name: string): Promise<Service | undefined>;
  findDeletedEntity(id: number): Promise<Service | undefined>;
}
