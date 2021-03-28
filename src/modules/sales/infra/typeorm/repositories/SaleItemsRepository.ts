import { getRepository, Repository } from 'typeorm';
import {
  ICreateSaleItemsDTO,
  IListSalesItemsDTO
} from '@modules/sales/dtos/ISaleItemsDTO';

import ISaleItemsRepository from '@modules/sales/repositories/ISaleItemsRepository';
import SaleItems from '../entities/SaleItems';

export default class SaleItemsRepository implements ISaleItemsRepository {
  private ormRepository: Repository<SaleItems>;

  constructor() {
    this.ormRepository = getRepository(SaleItems);
  }

  public async create(data: ICreateSaleItemsDTO): Promise<SaleItems> {
    const saleItemsInstance = this.ormRepository.create(data);

    const saleItems = await this.ormRepository.save(saleItemsInstance);

    return saleItems;
  }

  public async findOne(sale_items_id: string): Promise<SaleItems | undefined> {
    const saleItem = await this.ormRepository.findOne(sale_items_id, {
      loadRelationIds: true
    });

    return saleItem;
  }

  public async findAll(query: IListSalesItemsDTO): Promise<SaleItems[]> {
    const { limit, offset } = query;
    const take = limit ? limit : 0,
      skip = offset ? offset : 0;

    const saleItems = await this.ormRepository.find({
      take,
      skip,
      loadRelationIds: true
    });

    return saleItems;
  }

  public async update(saleItemsEntity: SaleItems): Promise<SaleItems> {
    const saleItems = await this.ormRepository.save(saleItemsEntity);

    return saleItems;
  }
}
