export interface ICreateStockDTO{
    product_id: string;
    quantity: number;
}

export interface IDeleteStockDTO {
    stock_id: string;
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