export interface ICreateClientDTO {
  name: string;
  cpf: string;
  phone?: string;
  email?: string;
}

export interface IUpdateClientDTO {
  name?: string;
  cpf?: string;
  phone?: string;
  email?: string;
}

export interface IDeleteClientDTO {
  client_id: string;
}

export interface IGetClientDTO {
  client_id: string;

}

export interface IListClientsDTO {
  limit?: number;
  offset?: number;
}
