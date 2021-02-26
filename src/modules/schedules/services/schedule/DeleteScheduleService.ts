import { injectable, inject } from 'tsyringe';
import IScheduleRepository from '@modules/schedules/repositories/IScheduleRepository';
import { Schedule } from '@modules/schedules/infra/typeorm/entities/Schedule';
import { IDeleteScheduleDTO } from '@modules/schedules/dtos/ISchedulesDTO';
import AppError from '@shared/errors/AppError';

@injectable()
export default class DeleteClientService {
  constructor(
    @inject('ScheduleRepository')
    private scheduleRepository: IScheduleRepository
  ) {}

  public async execute({
    schedule_id
  }: IDeleteScheduleDTO): Promise<Schedule | undefined> {
    const scheduleExists = await this.scheduleRepository.findOne(schedule_id);
    if (!scheduleExists) throw new AppError('Schedule does not exist!');

    const isScheduletDeleted = await this.scheduleRepository.delete({
      schedule_id
    });
    if (!isScheduletDeleted)
      throw new AppError('Schedule has not been deleted!');

    const schedule = await this.scheduleRepository.findDeletedEntity(
      schedule_id
    );

    return schedule;
  }
}
