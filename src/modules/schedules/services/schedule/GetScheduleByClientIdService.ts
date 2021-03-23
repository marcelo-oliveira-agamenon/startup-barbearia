import { injectable, inject } from 'tsyringe';
import IScheduleRepository from '@modules/schedules/repositories/IScheduleRepository';
import { Schedule } from '@modules/schedules/infra/typeorm/entities/Schedule';
import { IGetScheduleByClientIdDTO } from '@modules/schedules/dtos/ISchedulesDTO';
import AppError from '@shared/errors/AppError';

@injectable()
export class GetScheduleByClientIdService {
  constructor(
    @inject('ScheduleRepository')
    private scheduleRepository: IScheduleRepository
  ) {}

  public async execute({
    client_id
  }: IGetScheduleByClientIdDTO): Promise<Schedule[]> {
    const schedules = await this.scheduleRepository.findAllByClientId({
      client_id
    });
    if (!schedules) throw new AppError('Schedule does not exist!');

    return schedules;
  }
}
