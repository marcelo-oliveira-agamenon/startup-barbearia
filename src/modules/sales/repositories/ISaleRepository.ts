import {
  ICreateSaleDTO,
  IDeleteSaleDTO,
  IListSalesDTO
} from '@modules/sales/dtos/ISaleDTO';
import Sale from '../infra/typeorm/entities/Sale';

export default interface ISaleRepository {
  create(data: ICreateSaleDTO): Promise<Sale>;
  findOne(sale_id: string): Promise<Sale | undefined>;
  findAll(query: IListSalesDTO): Promise<Sale[]>;
  delete({ sale_id }: IDeleteSaleDTO): Promise<number | undefined>;
  findDeletedEntity(sale_id: string): Promise<Sale | undefined>;
  update(saleEntity: Sale): Promise<Sale>;
}
