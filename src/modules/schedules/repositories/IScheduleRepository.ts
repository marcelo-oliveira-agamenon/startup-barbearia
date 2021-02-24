import { Schedule } from '@modules/schedules/infra/typeorm/entities/Schedule';
import { ICreateScheduleDTO } from '@modules/schedules/dtos/ISchedulesDTO';

export default interface IScheduleRepository {
  create(data: ICreateScheduleDTO): Promise<Schedule>;
}
