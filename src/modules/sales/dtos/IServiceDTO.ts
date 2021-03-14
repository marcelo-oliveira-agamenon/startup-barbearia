export interface ICreateServicesDTO {
  name: string;
  value: number;
}

export interface IDeleteServicesDTO {
  service_id: string;
}

export interface IGetServiceDTO {
  service_id: string;
}

export interface IListServicesDTO {
  limit?: number;
  offset?: number;
}

export interface IUpdateServicesDTO {
  name: string;
  value: number;
}
