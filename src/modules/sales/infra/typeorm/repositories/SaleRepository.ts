import { getRepository, Repository } from 'typeorm';
import { ICreateSaleDTO } from '@modules/sales/dtos/ISaleDTO';

import ISaleRepository from '@modules/sales/repositories/ISaleRepository';
import Sale from '@modules/sales/infra/typeorm/entities/Sale';

export default class SaleRepository implements ISaleRepository {
  private ormRepository: Repository<Sale>;

  constructor() {
    this.ormRepository = getRepository(Sale);
  }

  public async create(data: ICreateSaleDTO): Promise<string> {
    const saleInserted = await this.ormRepository.insert(data);
    const sale_id = saleInserted.identifiers[0].sale_id;

    return sale_id;
  }

  public async findOne(id: string): Promise<Sale | undefined> {
    const sale = await this.ormRepository.findOne(id, {
      loadRelationIds: true
    });

    return sale;
  }

  // public async findAll(query: IListServicesDTO): Promise<Service[]> {
  //   const { limit, offset } = query;
  //   const take = limit ? limit : 0,
  //     skip = offset ? offset : 0;

  //   const sales = await this.ormRepository.find({ take, skip });

  //   return sales;
  // }

  // public async delete({
  //   service_id
  // }: IDeleteServicesDTO): Promise<number | undefined> {
  //   const isServiceDeleted = await this.ormRepository.softDelete(service_id);
  //   const isServiceAffected = isServiceDeleted.affected;

  //   return isServiceAffected;
  // }

  // public async findDeletedEntity(id: number): Promise<Service | undefined> {
  //   const service = await this.ormRepository.findOne(id, { withDeleted: true });

  //   return service;
  // }

  // public async update(id: number, data: IUpdateServicesDTO): Promise<Service> {
  //   const serviceExists = await this.ormRepository.findOne(id);
  //   const isServiceUpdated = await this.ormRepository.save(
  //     Object.assign(serviceExists, data)
  //   );

  //   return isServiceUpdated;
  // }
}
