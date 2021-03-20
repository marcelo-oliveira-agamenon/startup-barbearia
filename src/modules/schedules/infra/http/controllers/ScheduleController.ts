import { container } from 'tsyringe';
import { Request, Response } from 'express';

import {
  CreateScheduleService,
  GetScheduleService,
  ListSchedulesService,
  GetScheduleByClientIdService,
  GetScheduleByUserId,
  GetScheduleByDateService,
  DeleteScheduleService,
  UpdateScheduleService
} from '@modules/schedules/services/schedule';

import { classToClass } from 'class-transformer';
export default class ScheduleController {
  public async create(
    request: Request,
    response: Response
  ): Promise<Response | void> {
    const data = request.body;

    const createSchedule = container.resolve(CreateScheduleService);
    const schedule = await createSchedule.execute(data);

    return response.status(201).json(classToClass(schedule));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { schedule_id } = request.params;

    const getSchedule = container.resolve(GetScheduleService);
    const schedule = await getSchedule.execute({ schedule_id });

    return response.status(200).json(schedule);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const query = request.query;

    const listSchedules = container.resolve(ListSchedulesService);
    const schedules = await listSchedules.execute(query);

    return response.status(200).json(schedules);
  }

  public async getByClient(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { client_id } = request.params;

    const getSchedule = container.resolve(GetScheduleByClientIdService);
    const schedule = await getSchedule.execute({ client_id });

    return response.status(200).json(schedule);
  }

  public async getByUser(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { user_id } = request.params;

    const getSchedule = container.resolve(GetScheduleByUserId);
    const schedule = await getSchedule.execute({ user_id });

    return response.status(200).json(schedule);
  }

  public async getByDate(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { start_date, end_date } = request.body;

    const getSchedule = container.resolve(GetScheduleByDateService);
    const schedule = await getSchedule.execute({ start_date, end_date });

    return response.status(200).json(schedule);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { schedule_id } = request.params;
    const deleteSchedule = container.resolve(DeleteScheduleService);
    const schedule = await deleteSchedule.execute({ schedule_id });

    return response.status(200).json(schedule);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const { schedule_id } = request.params;
    const updateSchedule = container.resolve(UpdateScheduleService);
    const schedule = await updateSchedule.execute(schedule_id, data);

    return response.status(200).json(classToClass(schedule));
  }
}
