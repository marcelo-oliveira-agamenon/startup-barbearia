import { getRepository, Repository } from 'typeorm';
import IScheduleRepository from '@modules/schedules/repositories/IScheduleRepository';
import { Schedule } from '@modules/schedules/infra/typeorm/entities/Schedule';
import {
  ICreateScheduleDTO,
  IDeleteScheduleDTO,
  IGetScheduleByClientIdDTO,
  IGetScheduleByUserIdDTO,
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

  public async delete({
    schedule_id
  }: IDeleteScheduleDTO): Promise<number | undefined> {
    const isScheduleDeleted = await this.ormRepository.softDelete(schedule_id);
    const isScheduleAffected = isScheduleDeleted.affected;

    return isScheduleAffected;
  }

  public async findDeletedEntity(id: string): Promise<Schedule | undefined> {
    const schedule = await this.ormRepository.findOne(id, {
      withDeleted: true
    });

    return schedule;
  }

  public async findAllByClientId({
    client_id
  }: IGetScheduleByClientIdDTO): Promise<Schedule[]> {
    const schedules = await this.ormRepository.find({
      where: {
        client_id: client_id
      }
    });

    return schedules;
  }

  public async findAllByUserId({
    user_id
  }: IGetScheduleByUserIdDTO): Promise<Schedule[]> {
    const schedules = await this.ormRepository.find({
      where: {
        user_id: user_id
      }
    });

    return schedules;
  }
}
