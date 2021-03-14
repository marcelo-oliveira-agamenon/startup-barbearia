import { getRepository, Repository } from 'typeorm';
import IServiceRepository from '@modules/sales/repositories/IServiceRepository';
import Service from '@modules/sales/infra/typeorm/entities/Service';
import {
  ICreateServicesDTO,
  IListServicesDTO,
  IDeleteServicesDTO
} from '@modules/sales/dtos/IServiceDTO';

export default class ServiceRepository implements IServiceRepository {
  private ormRepository: Repository<Service>;

  constructor() {
    this.ormRepository = getRepository(Service);
  }

  public async create(data: ICreateServicesDTO): Promise<Service> {
    const serviceInstance = this.ormRepository.create(data);
    const service = await this.ormRepository.save(serviceInstance);

    return service;
  }

  public async findOne(service_id: string): Promise<Service | undefined> {
    const service = await this.ormRepository.findOne(service_id);

    return service;
  }

  public async findAll(query: IListServicesDTO): Promise<Service[]> {
    const { limit, offset } = query;
    const take = limit ? limit : 0,
      skip = offset ? offset : 0;

    const services = await this.ormRepository.find({ take, skip });

    return services;
  }

  public async delete({
    service_id
  }: IDeleteServicesDTO): Promise<number | undefined> {
    const isServiceDeleted = await this.ormRepository.softDelete(service_id);
    const isServiceAffected = isServiceDeleted.affected;

    return isServiceAffected;
  }

  public async findDeletedEntity(
    service_id: string
  ): Promise<Service | undefined> {
    const service = await this.ormRepository.findOne(service_id, {
      withDeleted: true
    });

    return service;
  }

  public async update(serviceEntity: Service): Promise<Service> {
    const service = await this.ormRepository.save(serviceEntity);

    return service;
  }
  public async findByName(name: string): Promise<Service | undefined> {
    const service = await this.ormRepository.findOne({ name });

    return service;
  }
}
