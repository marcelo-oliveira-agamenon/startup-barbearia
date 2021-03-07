export interface ICreateSaleDTO {
  client_id?: string;
  user_id: string;
  value: number;
  discount?: number;
  is_discount_fixed?: boolean;
}
