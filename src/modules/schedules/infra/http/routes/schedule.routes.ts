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
  '/client/:client_id',
  celebrate({
    [Segments.PARAMS]: {
      client_id: Joi.string().required()
    }
  }),
  scheduleController.getByClient
);

scheduleRouter.get(
  '/user/:user_id',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().required()
    }
  }),
  scheduleController.getByUser
);

scheduleRouter.get(
  '/date/filter',
  celebrate({
    [Segments.BODY]: {
      start_date: Joi.date().required(),
      end_date: Joi.date().required()
    }
  }),
  scheduleController.getByDate
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
      service_id: Joi.number().required(),
      start_date: Joi.date().required(),
      end_date: Joi.date().required(),
      status: Joi.boolean().required(),
      description: Joi.string().required()
    }
  }),
  scheduleController.create
);

scheduleRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().required(),
      client_id: Joi.string().required(),
      service_id: Joi.number().required(),
      start_date: Joi.date().required(),
      end_date: Joi.date().required(),
      status: Joi.boolean().required(),
      description: Joi.string().required()
    }
  }),
  scheduleController.update
);

scheduleRouter.delete(
  '/:schedule_id',
  celebrate({
    [Segments.PARAMS]: {
      schedule_id: Joi.string().required()
    }
  }),
  scheduleController.delete
);

export default scheduleRouter;