import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ScheduleController from '@modules/schedules/infra/http/controllers/ScheduleController';

const scheduleRouter = Router();
const scheduleController = new ScheduleController();

scheduleRouter.get(
  '/:schedule_id',
  celebrate({
    [Segments.PARAMS]: {
      schedule_id: Joi.string().uuid().required()
    }
  }),
  scheduleController.get
);

scheduleRouter.get(
  '/client/:client_id',
  celebrate({
    [Segments.PARAMS]: {
      client_id: Joi.string().uuid().required()
    }
  }),
  scheduleController.getByClient
);

scheduleRouter.get(
  '/user/:user_id',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().uuid().required()
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
      limit: Joi.number().integer().positive(),
      offset: Joi.number().integer().positive()
    }
  }),
  scheduleController.list
);

scheduleRouter.post(
  '/register',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().uuid().required(),
      client_id: Joi.string().uuid(),
      service_id: Joi.string().uuid().required(),
      start_date: Joi.date().required(),
      end_date: Joi.date().min(Joi.ref('start_date')),
      status: Joi.boolean().required(),
      description: Joi.string().required()
    }
  }),
  scheduleController.create
);

scheduleRouter.put(
  '/:schedule_id',
  celebrate({
    [Segments.PARAMS]: {
      schedule_id: Joi.string().uuid().required()
    },
    [Segments.BODY]: Joi.object().keys({
      user_id: Joi.string().uuid(),
      client_id: Joi.string().uuid(),
      service_id: Joi.string().uuid(),
      start_date: Joi.date(),
      end_date: Joi.date().min(Joi.ref('start_date')),
      status: Joi.boolean(),
      description: Joi.string()
    })
  }),
  scheduleController.update
);

scheduleRouter.delete(
  '/:schedule_id',
  celebrate({
    [Segments.PARAMS]: {
      schedule_id: Joi.string().uuid().required()
    }
  }),
  scheduleController.delete
);

export default scheduleRouter;
