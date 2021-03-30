export interface ICreatePaymentMovementDTO {
  value: number;
  payment_method_id: string;
  sale_id: string;
}

export interface IDeletePaymentMovementDTO {
  payment_movement_id: string;
}

export interface IGetPaymentMovementDTO {
  payment_movement_id: string;
}

export interface IListPaymentMovementsDTO {
  limit?: number;
  offset?: number;
}

export interface IUpdatePaymentMovementDTO {
  value: number;
  sale_id: string;
}
