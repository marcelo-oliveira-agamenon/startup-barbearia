import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateScheduleService from '@modules/schedules/services/schedule/CreateScheduleService';
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
}
