import { getRepository, Repository } from 'typeorm';
import { ICreateSaleItemsDTO } from '@modules/sales/dtos/ISaleItemsDTO';

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
}
