import SaleItems from '@modules/sales/infra/typeorm/entities/SaleItems';
import {
  ICreateSaleItemsDTO,
  IListSalesItemsDTO,
  IDeleteSaleItemDTO
} from '@modules/sales/dtos/ISaleItemsDTO';

export default interface ISaleItemsRepository {
  create(data: ICreateSaleItemsDTO): Promise<SaleItems>;
  update(saleItemsEntity: SaleItems): Promise<SaleItems>;
  delete({ sale_items_id }: IDeleteSaleItemDTO): Promise<number | undefined>;
  findOne(sale_items_id: string): Promise<SaleItems | undefined>;
  findDeletedEntity(sale_items_id: string): Promise<SaleItems | undefined>;
  findAll(query: IListSalesItemsDTO): Promise<SaleItems[]>;
}
