import { Schedule } from '@modules/schedules/infra/typeorm/entities/Schedule';
import {
  ICreateScheduleDTO,
  IListScheduleDTO,
  IDeleteScheduleDTO,
  IGetScheduleByClientIdDTO,
  IGetScheduleByUserIdDTO,
  IGetScheduleByDateDTO
} from '@modules/schedules/dtos/ISchedulesDTO';

export default interface IScheduleRepository {
  create(data: ICreateScheduleDTO): Promise<Schedule>;
  findOne(schedule_id: string): Promise<Schedule | undefined>;
  findAll(query: IListScheduleDTO): Promise<Schedule[]>;
  delete({ schedule_id }: IDeleteScheduleDTO): Promise<number | undefined>;
  findDeletedEntity(schedule_id: string): Promise<Schedule | undefined>;
  verifyScheduleByUserOrClient(
    start_date: Date,
    end_date: Date,
    user_id?: string,
    client_id?: string
  ): Promise<boolean>;
  findAllByClientId({
    client_id
  }: IGetScheduleByClientIdDTO): Promise<Schedule[]>;
  findAllByUserId({ user_id }: IGetScheduleByUserIdDTO): Promise<Schedule[]>;
  findAllByDate({
    start_date,
    end_date
  }: IGetScheduleByDateDTO): Promise<Schedule[]>;
  update(schedule: Schedule): Promise<Schedule>;
}
