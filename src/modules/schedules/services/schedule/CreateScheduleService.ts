import { inject, injectable } from 'tsyringe';
import IScheduleRepository from '@modules/schedules/repositories/IScheduleRepository';
import { ICreateScheduleDTO } from '@modules/schedules/dtos/ISchedulesDTO';
import { Schedule } from '@modules/schedules/infra/typeorm/entities/Schedule';

@injectable()
export default class CreateScheduleService {
  constructor(
    @inject('ScheduleRepository')
    private scheduleRepository: IScheduleRepository
  ) {}

  public async execute(
    data: ICreateScheduleDTO
  ): Promise<Schedule | undefined> {
    const schedule = await this.scheduleRepository.create(data);

    return schedule;
  }
}
