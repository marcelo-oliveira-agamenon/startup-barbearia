import { Schedule } from '@modules/schedules/infra/typeorm/entities/Schedule';
import {
  ICreateScheduleDTO,
  IListScheduleDTO,
  IDeleteScheduleDTO,
  IGetScheduleByClientIdDTO,
  IGetScheduleByUserIdDTO,
  IGetScheduleByDateDTO,
  IUpdateScheduleDTO
} from '@modules/schedules/dtos/ISchedulesDTO';

export default interface IScheduleRepository {
  create(data: ICreateScheduleDTO): Promise<Schedule>;
  findOne(id: string): Promise<Schedule | undefined>;
  findAll(query: IListScheduleDTO): Promise<Schedule[]>;
  delete({ schedule_id }: IDeleteScheduleDTO): Promise<number | undefined>;
  findDeletedEntity(id: string): Promise<Schedule | undefined>;
  findAllByClientId({
    client_id
  }: IGetScheduleByClientIdDTO): Promise<Schedule[]>;
  findAllByUserId({ user_id }: IGetScheduleByUserIdDTO): Promise<Schedule[]>;
  findAllByDate({
    start_date,
    end_date
  }: IGetScheduleByDateDTO): Promise<Schedule[]>;
  update(id: string, data: IUpdateScheduleDTO): Promise<Schedule>;
}
