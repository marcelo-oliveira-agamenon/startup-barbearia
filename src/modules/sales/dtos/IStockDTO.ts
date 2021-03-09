export interface ICreateStockDTO{
    product_id: string;
    quantity: number;
}

export interface IGetStockDTO {
    stock_id: string;
}

export interface IListStocksDTO {
    limit?: number;
    offset?: number;
  }
  
  export interface IUpdateStockDTO {
    stock_id: string;
    quantity: number;
  }