export interface ICreateProductDTO {
    name: string;
    cost: number;
    value: number;
    description?: string;
    discount?: number;
  }
  
  export interface IDeleteProductDTO {
    product_id: string;
  }
  
  export interface IGetProductDTO {
    product_id: string;
  }
  
  export interface IListProductsDTO {
    limit?: number;
    offset?: number;
  }
  
  export interface IUpdateProductDTO {
    name: string;
    value: number;
  }
  