import { getRepository, Repository } from 'typeorm';
import IServiceRepository from '@modules/sales/repositories/IServiceRepository';
import Service from '@modules/sales/infra/typeorm/entities/Service';
import {
  ICreateServicesDTO,
  IListServicesDTO,
  IDeleteServicesDTO,
  IUpdateServicesDTO
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

  public async findOne(id: number): Promise<Service | undefined> {
    const service = await this.ormRepository.findOne(id);

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

  public async findDeletedEntity(id: number): Promise<Service | undefined> {
    const service = await this.ormRepository.findOne(id, { withDeleted: true });

    return service;
  }

  public async update(id: number, data: IUpdateServicesDTO): Promise<Service> {
    const serviceExists = await this.ormRepository.findOne(id);
    const isServiceUpdated = await this.ormRepository.save(
      Object.assign(serviceExists, data)
    );

    return isServiceUpdated;
  }
  public async findByName(name: string): Promise<Service | undefined> {
    const service = await this.ormRepository.findOne({ name });

    return service;
  }
}
