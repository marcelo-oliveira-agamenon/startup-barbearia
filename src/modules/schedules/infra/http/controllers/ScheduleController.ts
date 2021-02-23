import { container } from 'tsyringe';
import { Request, Response } from 'express';

export default class ScheduleController {
  public async create(
    request: Request,
    response: Response
  ): Promise<Response | void> {
    const data = request.body;
  }
}
