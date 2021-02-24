import { getRepository, Repository } from 'typeorm';
import IScheduleRepository from '@modules/schedules/repositories/IScheduleRepository';
import { Schedule } from '@modules/schedules/infra/typeorm/entities/Schedule';
import { ICreateScheduleDTO } from '@modules/schedules/dtos/ISchedulesDTO';

export default class ScheduleRepository implements IScheduleRepository {
  private ormRepository: Repository<Schedule>;

  constructor() {
    this.ormRepository = getRepository(Schedule);
  }

  public async create(data: ICreateScheduleDTO): Promise<Schedule> {
    const scheduleInstance = this.ormRepository.create(data);
    const schedule = await this.ormRepository.save(scheduleInstance);

    return schedule;
  }
}
