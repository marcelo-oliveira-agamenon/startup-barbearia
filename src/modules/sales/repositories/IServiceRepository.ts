import Service from '@modules/sales/infra/typeorm/entities/Service';
import {
  ICreateServicesDTO,
  IListServicesDTO,
  IDeleteServicesDTO
} from '@modules/sales/dtos/IServiceDTO';

export default interface IServiceRepository {
  create(data: ICreateServicesDTO): Promise<Service>;
  delete({ service_id }: IDeleteServicesDTO): Promise<number | undefined>;
  update(serviceEntity: Service): Promise<Service>;
  findOne(service_id: string): Promise<Service | undefined>;
  findAll(query: IListServicesDTO): Promise<Service[]>;
  findByName(name: string): Promise<Service | undefined>;
  findDeletedEntity(service_id: string): Promise<Service | undefined>;
}
