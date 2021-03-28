import SaleItems from '@modules/sales/infra/typeorm/entities/SaleItems';
import {
  ICreateSaleItemsDTO,
  IListSalesItemsDTO
} from '@modules/sales/dtos/ISaleItemsDTO';

export default interface ISaleItemsRepository {
  create(data: ICreateSaleItemsDTO): Promise<SaleItems>;
  update(saleItemsEntity: SaleItems): Promise<SaleItems>;
  // delete({ product_id }: IDeleteProductDTO): Promise<number | undefined>;
  findOne(sale_items_id: string): Promise<SaleItems | undefined>;
  // findDeletedEntity(product_id: string): Promise<SaleItems | undefined>;
  // findByName(name: string): Promise<SaleItems | undefined>;
  findAll(query: IListSalesItemsDTO): Promise<SaleItems[]>;
}
