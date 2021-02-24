import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ScheduleController from '@modules/schedules/infra/http/controllers/ScheduleController';

const scheduleRouter = Router();
const scheduleController = new ScheduleController();

scheduleRouter.post(
  '/register',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().required(),
      client_id: Joi.string().required(),
      service_id: Joi.string().required(),
      start_date: Joi.date().required(),
      end_date: Joi.date().required()
    }
  }),
  scheduleController.create
);

export default scheduleRouter;
