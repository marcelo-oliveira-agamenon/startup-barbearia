import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ScheduleController from '@modules/schedules/infra/http/controllers/ScheduleController';

const scheduleRouter = Router();
const scheduleController = new ScheduleController();

scheduleRouter.get(
  '/:schedule_id',
  celebrate({
    [Segments.PARAMS]: {
      schedule_id: Joi.string().required()
    }
  }),
  scheduleController.get
);

scheduleRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      limit: Joi.number(),
      offset: Joi.number()
    }
  }),
  scheduleController.list
);

scheduleRouter.post(
  '/register',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().required(),
      client_id: Joi.string().required(),
      service_id: Joi.string().required(),
      start_date: Joi.date().required(),
      end_date: Joi.date().required(),
      status: Joi.boolean().required(),
      description: Joi.string().required()
    }
  }),
  scheduleController.create
);

export default scheduleRouter;
