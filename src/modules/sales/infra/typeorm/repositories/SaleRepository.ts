import { getRepository, Repository } from 'typeorm';
import {
  ICreateSaleDTO,
  IDeleteSaleDTO,
  IListSalesDTO
} from '@modules/sales/dtos/ISaleDTO';

import ISaleRepository from '@modules/sales/repositories/ISaleRepository';
import Sale from '@modules/sales/infra/typeorm/entities/Sale';

export default class SaleRepository implements ISaleRepository {
  private ormRepository: Repository<Sale>;

  constructor() {
    this.ormRepository = getRepository(Sale);
  }

  public async create(data: ICreateSaleDTO): Promise<Sale> {
    const saleInstance = this.ormRepository.create(data);
    const sale = await this.ormRepository.save(saleInstance);

    return sale;
  }

  public async findOne(sale_id: string): Promise<Sale | undefined> {
    const sale = await this.ormRepository.findOne(sale_id, {
      loadRelationIds: true
    });

    return sale;
  }

  public async findAll(query: IListSalesDTO): Promise<Sale[]> {
    const { limit, offset } = query;
    const take = limit ? limit : 0,
      skip = offset ? offset : 0;

    const sales = await this.ormRepository.find({
      take,
      skip,
      loadRelationIds: true
    });

    return sales;
  }

  public async delete({
    sale_id
  }: IDeleteSaleDTO): Promise<number | undefined> {
    const isSaleDeleted = await this.ormRepository.softDelete(sale_id);
    const isSaleAffected = isSaleDeleted.affected;

    return isSaleAffected;
  }

  public async findDeletedEntity(sale_id: string): Promise<Sale | undefined> {
    const sale = await this.ormRepository.findOne(sale_id, {
      withDeleted: true,
      loadRelationIds: true
    });

    return sale;
  }

  public async update(saleEntity: Sale): Promise<Sale> {
    const sale = await this.ormRepository.save(saleEntity);

    return sale;
  }
}
