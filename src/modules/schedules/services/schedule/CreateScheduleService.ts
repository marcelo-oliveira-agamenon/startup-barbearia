import { inject, injectable } from 'tsyringe';
import IScheduleRepository from '@modules/schedules/repositories/IScheduleRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IClientRepository from '@modules/users/repositories/IClientRepository';
import { ICreateScheduleDTO } from '@modules/schedules/dtos/ISchedulesDTO';
import { Schedule } from '@modules/schedules/infra/typeorm/entities/Schedule';
import AppError from '@shared/errors/AppError';

@injectable()
export class CreateScheduleService {
  constructor(
    @inject('ScheduleRepository')
    private scheduleRepository: IScheduleRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('ClientRepository')
    private clientRepository: IClientRepository
  ) {}

  public async execute(
    data: ICreateScheduleDTO
  ): Promise<Schedule | undefined> {
    const userExist = await this.userRepository.findOne(data.user_id);

    if (!userExist) throw new AppError("This user doesn't exist");

    const clientExist = await this.clientRepository.findOne(data.client_id);

    if (!clientExist) throw new AppError("This client doesn't exist");

    try {
      const verifyInstanceClient = await this.scheduleRepository.verifyScheduleByUserOrClient(
        data.start_date,
        data.end_date,
        undefined,
        data.client_id
      );

      if (verifyInstanceClient === true)
        throw new AppError(
          'This client already has a schedule for this time',
          422
        );
    } catch (error) {
      return undefined;
    }

    try {
      const verifyInstanceUser = await this.scheduleRepository.verifyScheduleByUserOrClient(
        data.start_date,
        data.end_date,
        data.user_id,
        undefined
      );

      if (verifyInstanceUser === true)
        throw new AppError(
          'This user already has a schedule for this time',
          422
        );
    } catch (error) {
      return undefined;
    }

    const schedule = await this.scheduleRepository.create(data);

    return schedule;
  }
}
