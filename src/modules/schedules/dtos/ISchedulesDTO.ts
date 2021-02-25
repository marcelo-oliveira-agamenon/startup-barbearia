export interface ICreateScheduleDTO {
  user_id: string;
  client_id: string;
  service_id: string;
  start_date: Date;
  end_date: Date;
  status: boolean;
  description: string;
}

export interface IGetScheduleDTO {
  schedule_id: string;
}

export interface IListScheduleDTO {
  limit?: number;
  offset?: number;
}
