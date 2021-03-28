export interface ICreateSaleItemsDTO {
  sale_id: string;
  product_id?: string;
  service_id?: string;
  quantity?: number;
  value: number;
}
export interface IGetSaleItemsDTO {
  sale_items_id: string;
}
export interface IListSalesItemsDTO {
  limit?: number;
  offset?: number;
}

export interface IUpdateSaleItemsDTO {
  sale_id?: string;
  product_id?: string;
  service_id?: string | null;
  quantity?: number;
  value?: number;
}

export interface IDeleteSaleItemDTO {
  sale_items_id: string;
}
