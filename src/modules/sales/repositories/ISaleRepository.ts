import { ICreateSaleDTO } from '@modules/sales/dtos/ISaleDTO';
import Sale from '../infra/typeorm/entities/Sale';

export default interface ISaleRepository {
  create(data: ICreateSaleDTO): Promise<Sale>;
  findOne(id: string): Promise<Sale | undefined>;
  // findAll(query: IListServicesDTO): Promise<Service[]>;
  // delete({ service_id }: IDeleteServicesDTO): Promise<number | undefined>;
  // findDeletedEntity(id: number): Promise<Service | undefined>;
  // update(id: number, data: IUpdateServicesDTO): Promise<Service>;
}
