import { injectable, inject } from 'tsyringe';
import IScheduleRepository from '@modules/schedules/repositories/IScheduleRepository';
import { Schedule } from '@modules/schedules/infra/typeorm/entities/Schedule';
import { IGetScheduleByUserIdDTO } from '@modules/schedules/dtos/ISchedulesDTO';
import AppError from '@shared/errors/AppError';

@injectable()
export class GetScheduleByUserId {
  constructor(
    @inject('ScheduleRepository')
    private scheduleRepository: IScheduleRepository
  ) {}

  public async execute({
    user_id
  }: IGetScheduleByUserIdDTO): Promise<Schedule[]> {
    const schedules = await this.scheduleRepository.findAllByUserId({
      user_id
    });
    if (!schedules) throw new AppError('Schedule does not exist!');

    return schedules;
  }
}
