import { getRepository, Repository } from 'typeorm';
import IScheduleRepository from '@modules/schedules/repositories/IScheduleRepository';
import { Schedule } from '@modules/schedules/infra/typeorm/entities/Schedule';
import {
  ICreateScheduleDTO,
  IDeleteScheduleDTO,
  IGetScheduleByClientIdDTO,
  IGetScheduleByDateDTO,
  IGetScheduleByUserIdDTO,
  IListScheduleDTO
} from '@modules/schedules/dtos/ISchedulesDTO';
import { Between } from 'typeorm';

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

  public async verifyScheduleByUserOrClient(
    start_date: Date,
    end_date: Date,
    user_id?: string,
    client_id?: string
  ): Promise<boolean> {
    let verifyInstance: Schedule[] = [];

    if (user_id) {
      verifyInstance = await this.ormRepository.find({
        where: {
          user_id,
          start_date: Between(start_date, end_date),
          end_date: Between(start_date, end_date)
        }
      });
    }

    if (client_id) {
      verifyInstance = await this.ormRepository.find({
        where: {
          client_id,
          start_date: Between(start_date, end_date),
          end_date: Between(start_date, end_date)
        }
      });
    }

    if (verifyInstance.length) {
      return true;
    } else {
      return false;
    }
  }

  public async findOne(schedule_id: string): Promise<Schedule | undefined> {
    const schedule = await this.ormRepository.findOne(schedule_id, {
      loadRelationIds: true
    });

    return schedule;
  }

  public async findAll(query: IListScheduleDTO): Promise<Schedule[]> {
    const { limit, offset } = query;
    const take = limit ? limit : 0,
      skip = offset ? offset : 0;

    const schedules = await this.ormRepository.find({
      loadRelationIds: true,
      take,
      skip
    });

    return schedules;
  }

  public async delete({
    schedule_id
  }: IDeleteScheduleDTO): Promise<number | undefined> {
    const isScheduleDeleted = await this.ormRepository.softDelete(schedule_id);
    const isScheduleAffected = isScheduleDeleted.affected;

    return isScheduleAffected;
  }

  public async findDeletedEntity(
    schedule_id: string
  ): Promise<Schedule | undefined> {
    const schedule = await this.ormRepository.findOne(schedule_id, {
      withDeleted: true,
      loadRelationIds: true
    });

    return schedule;
  }

  public async findAllByClientId({
    client_id,
    start_date,
    end_date
  }: IGetScheduleByClientIdDTO): Promise<Schedule[]> {
    const schedules = await this.ormRepository.find({
      where: {
        client_id,
        start_date: Between(start_date, end_date),
        end_date: Between(start_date, end_date)
      },
      loadRelationIds: true
    });

    return schedules;
  }

  public async findAllByUserId({
    user_id,
    start_date,
    end_date
  }: IGetScheduleByUserIdDTO): Promise<Schedule[]> {
    const schedules = await this.ormRepository.find({
      where: {
        user_id,
        start_date: Between(start_date, end_date),
        end_date: Between(start_date, end_date)
      },
      loadRelationIds: true
    });

    return schedules;
  }

  public async findAllByDate({
    start_date,
    end_date
  }: IGetScheduleByDateDTO): Promise<Schedule[]> {
    const schedules = await this.ormRepository.find({
      where: {
        start_date: Between(start_date, end_date),
        end_date: Between(start_date, end_date)
      },
      loadRelationIds: true
    });

    return schedules;
  }

  public async update(scheduleEntity: Schedule): Promise<Schedule> {
    const schedule = await this.ormRepository.save(scheduleEntity);

    return schedule;
  }
}
