import Client from '@modules/users/infra/typeorm/entities/Client';
import { User } from '@modules/users/infra/typeorm/entities/User';

export interface ICreateSaleParamsDTO {
  client_id?: string;
  user_id: string;
  value: number;
  discount?: number;
  is_discount_fixed?: boolean;
}
export interface ICreateSaleDTO {
  client?: Client;
  user: User;
  value: number;
  discount?: number;
  is_discount_fixed?: boolean;
}
