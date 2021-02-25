import { getRepository, Repository } from 'typeorm';
import IScheduleRepository from '@modules/schedules/repositories/IScheduleRepository';
import { Schedule } from '@modules/schedules/infra/typeorm/entities/Schedule';
import {
  ICreateScheduleDTO,
  IListScheduleDTO
} from '@modules/schedules/dtos/ISchedulesDTO';

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

  public async findOne(id: string): Promise<Schedule | undefined> {
    const schedule = await this.ormRepository.findOne(id);

    return schedule;
  }

  public async findAll(query: IListScheduleDTO): Promise<Schedule[]> {
    const { limit, offset } = query;
    const take = limit ? limit : 0,
      skip = offset ? offset : 0;

    const schedules = await this.ormRepository.find({ take, skip });

    return schedules;
  }
}
