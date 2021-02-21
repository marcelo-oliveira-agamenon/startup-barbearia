export interface ICreateProductDTO {
    name: string;
    cost: number;
    price: number;
    description?: string;
    discount?: number;
  }
  
  export interface IDeleteProductDTO {
    product_id: number;
  }
  
  export interface IGetProductDTO {
    product_id: number;
  }
  
  export interface IListProductDTO {
    limit?: number;
    offset?: number;
  }
  
  export interface IUpdateProductDTO {
    name: string;
    value: number;
  }
  