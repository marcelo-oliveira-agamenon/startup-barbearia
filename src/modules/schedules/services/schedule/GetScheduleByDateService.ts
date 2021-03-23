import { injectable, inject } from 'tsyringe';
import IScheduleRepository from '@modules/schedules/repositories/IScheduleRepository';
import { Schedule } from '@modules/schedules/infra/typeorm/entities/Schedule';
import { IGetScheduleByDateDTO } from '@modules/schedules/dtos/ISchedulesDTO';
import AppError from '@shared/errors/AppError';

@injectable()
export class GetScheduleByDateService {
  constructor(
    @inject('ScheduleRepository')
    private scheduleRepository: IScheduleRepository
  ) {}

  public async execute({
    start_date,
    end_date
  }: IGetScheduleByDateDTO): Promise<Schedule[]> {
    const schedules = await this.scheduleRepository.findAllByDate({
      start_date,
      end_date
    });
    if (!schedules) throw new AppError('Schedule does not exist!');

    return schedules;
  }
}
