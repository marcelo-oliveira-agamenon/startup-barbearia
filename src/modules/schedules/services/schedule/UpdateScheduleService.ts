import { injectable, inject } from 'tsyringe';
import IScheduleRepository from '@modules/schedules/repositories/IScheduleRepository';
import { Schedule } from '@modules/schedules/infra/typeorm/entities/Schedule';
import { IUpdateScheduleDTO } from '@modules/schedules/dtos/ISchedulesDTO';
import AppError from '@shared/errors/AppError';

@injectable()
export default class GetScheduleByDateService {
  constructor(
    @inject('ScheduleRepository')
    private scheduleRepository: IScheduleRepository
  ) {}

  public async execute(
    id: string,
    data: IUpdateScheduleDTO
  ): Promise<Schedule> {
    const scheduleExists = await this.scheduleRepository.findOne(id);
    if (!scheduleExists) throw new AppError('Schedule does not exist!');

    const schedule = await this.scheduleRepository.update(id, data);

    return schedule;
  }
}
