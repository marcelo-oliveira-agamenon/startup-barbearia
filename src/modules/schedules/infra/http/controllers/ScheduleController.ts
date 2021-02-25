import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateScheduleService from '@modules/schedules/services/schedule/CreateScheduleService';
import GetScheduleService from '@modules/schedules/services/schedule/GetScheduleService';
import GetSchedulesListService from '@modules/schedules/services/schedule/GetSchedulesListService';
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

    const getScheduleList = container.resolve(GetSchedulesListService);
    const schedules = await getScheduleList.execute(query);

    return response.status(200).json(schedules);
  }
}
