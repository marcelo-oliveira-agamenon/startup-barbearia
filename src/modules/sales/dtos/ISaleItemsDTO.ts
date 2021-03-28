export interface ICreateSaleItemsDTO {
  sale_id: string;
  product_id?: string;
  service_id?: string;
  quantity?: number;
  value: number;
}

export interface IListSalesItemsDTO {
  limit?: number;
  offset?: number;
}
