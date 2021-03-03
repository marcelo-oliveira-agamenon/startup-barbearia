export interface ICreateServicesDTO {
  name: string;
  value: number;
}

export interface IDeleteServicesDTO {
  service_id: number;
}

export interface IGetServiceDTO {
  service_id: number;
}

export interface IListServicesDTO {
  limit?: number;
  offset?: number;
}

export interface IUpdateServicesDTO {
  name: string;
  value: number;
}
