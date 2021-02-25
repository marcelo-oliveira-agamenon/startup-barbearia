import { injectable, inject } from 'tsyringe';

import IScheduleRepository from '@modules/schedules/repositories/IScheduleRepository';

import { Schedule } from '@modules/schedules/infra/typeorm/entities/Schedule';

import { IGetScheduleDTO } from '@modules/schedules/dtos/ISchedulesDTO';

import AppError from '@shared/errors/AppError';

@injectable()
export default class GetScheduleService {
  constructor(
    @inject('ScheduleRepository')
    private scheduleRepository: IScheduleRepository
  ) {}

  public async execute({
    schedule_id
  }: IGetScheduleDTO): Promise<Schedule | undefined> {
    const schedule = await this.scheduleRepository.findOne(schedule_id);
    if (!schedule) throw new AppError('Schedule does not exist!');

    return schedule;
  }
}
