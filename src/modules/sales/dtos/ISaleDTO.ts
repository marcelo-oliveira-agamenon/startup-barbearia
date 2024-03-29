export interface ICreateSaleParamsDTO {
  client_id?: string;
  user_id: string;
  value: number;
  discount?: number;
  is_discount_fixed?: boolean;
}
export interface ICreateSaleDTO {
  client_id?: string;
  user_id: string;
  value: number;
  discount?: number;
  is_discount_fixed?: boolean;
}

export interface IUpdateSaleDTO {
  client_id?: string;
  user_id?: string;
  discount?: number;
  is_discount_fixed?: boolean;
}

export interface IGetSaleDTO {
  sale_id: string;
}

export interface IListSalesDTO {
  limit?: number;
  offset?: number;
}

export interface IDeleteSaleDTO {
  sale_id: string;
}
