export interface ICreateStockDTO{
    product_id: string;
    quantity: number;
}

export interface IGetStockDTO {
    product_id: string;
}

export interface IListStocksDTO {
    limit?: number;
    offset?: number;
  }
  
  export interface IUpdateStockDTO {
    stock_id: number;
    quantity: number;
  }