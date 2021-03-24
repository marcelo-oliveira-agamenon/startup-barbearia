import { injectable, inject } from 'tsyringe';
import IScheduleRepository from '@modules/schedules/repositories/IScheduleRepository';
import { Schedule } from '@modules/schedules/infra/typeorm/entities/Schedule';
import { IListScheduleDTO } from '@modules/schedules/dtos/ISchedulesDTO';

@injectable()
export class ListSchedulesService {
  constructor(
    @inject('ScheduleRepository')
    private scheduleRepository: IScheduleRepository
  ) {}

  public async execute(query: IListScheduleDTO): Promise<Schedule[]> {
    const schedules = await this.scheduleRepository.findAll(query);

    return schedules;
  }
}
