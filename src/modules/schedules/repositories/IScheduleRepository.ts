import { Schedule } from '@modules/schedules/infra/typeorm/entities/Schedule';
import {
  ICreateScheduleDTO,
  IListScheduleDTO
} from '@modules/schedules/dtos/ISchedulesDTO';

export default interface IScheduleRepository {
  create(data: ICreateScheduleDTO): Promise<Schedule>;
  findOne(id: string): Promise<Schedule | undefined>;
  findAll(query: IListScheduleDTO): Promise<Schedule[]>;
}
