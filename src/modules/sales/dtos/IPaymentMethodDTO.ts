export interface ICreatePaymentMethodDTO {
  name: string;
  is_active?: boolean;
}

export interface IListPaymentMethodsDTO {
  limit?: number;
  offset?: number;
}

export interface IGetPaymentMethodDTO {
  payment_method_id: number;
}

export interface IUpdatePaymentMethodDTO {
  payment_method_id: number;
  name?: string;
  is_active?: boolean;
}

export interface IDeletePaymentMethodDTO {
  payment_method_id: number;
}
