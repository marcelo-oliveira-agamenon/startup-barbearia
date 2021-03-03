export interface ICreateScheduleDTO {
  user_id: string;
  client_id: string;
  service_id: number;
  start_date: Date;
  end_date: Date;
  status: boolean;
  description: string;
}

export interface IUpdateScheduleDTO {
  user_id: string;
  client_id: string;
  service_id: number;
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

export interface IDeleteScheduleDTO {
  schedule_id: string;
}

export interface IGetScheduleByClientIdDTO {
  client_id: string;
}

export interface IGetScheduleByUserIdDTO {
  user_id: string;
}

export interface IGetScheduleByDateDTO {
  start_date: Date;
  end_date: Date;
}
