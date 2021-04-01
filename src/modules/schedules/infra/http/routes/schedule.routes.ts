import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ScheduleController from '@modules/schedules/infra/http/controllers/ScheduleController';

export default (router: Router): void => {
  const url = '/schedules';
  router.get(
    `${url}/:schedule_id`,
    celebrate({
      [Segments.PARAMS]: {
        schedule_id: Joi.string().uuid({ version: 'uuidv4' }).required()
      }
    }),
    ScheduleController.get
  );

  router.get(
    `${url}/client/:client_id`,
    celebrate({
      [Segments.PARAMS]: {
        client_id: Joi.string().uuid({ version: 'uuidv4' }).required()
      }
    }),
    ScheduleController.getByClient
  );

  router.get(
    `${url}/user/:user_id`,
    celebrate({
      [Segments.PARAMS]: {
        user_id: Joi.string().uuid({ version: 'uuidv4' }).required()
      }
    }),
    ScheduleController.getByUser
  );

  router.get(
    `${url}/date/filter`,
    celebrate({
      [Segments.BODY]: {
        start_date: Joi.date().required(),
        end_date: Joi.date().min(Joi.ref('start_date')).required()
      }
    }),
    ScheduleController.getByDate
  );

  router.get(
    url,
    celebrate({
      [Segments.QUERY]: {
        limit: Joi.number().integer().positive(),
        offset: Joi.number().integer().positive()
      }
    }),
    ScheduleController.list
  );

  router.post(
    `${url}/register`,
    celebrate({
      [Segments.BODY]: {
        user_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
        client_id: Joi.string().uuid({ version: 'uuidv4' }),
        service_id: Joi.string().uuid().required(),
        start_date: Joi.date().required(),
        end_date: Joi.date().min(Joi.ref('start_date')),
        status: Joi.boolean().required(),
        description: Joi.string().required()
      }
    }),
    ScheduleController.create
  );

  router.put(
    `${url}/:schedule_id`,
    celebrate({
      [Segments.PARAMS]: {
        schedule_id: Joi.string().uuid({ version: 'uuidv4' }).required()
      },
      [Segments.BODY]: Joi.object()
        .keys({
          user_id: Joi.string().uuid({ version: 'uuidv4' }),
          client_id: Joi.string().uuid({ version: 'uuidv4' }),
          service_id: Joi.string().uuid({ version: 'uuidv4' }),
          start_date: Joi.date(),
          end_date: Joi.date().min(Joi.ref('start_date')),
          status: Joi.boolean(),
          description: Joi.string()
        })
        .min(1)
    }),
    ScheduleController.update
  );

  router.delete(
    `${url}/:schedule_id`,
    celebrate({
      [Segments.PARAMS]: {
        schedule_id: Joi.string().uuid({ version: 'uuidv4' }).required()
      }
    }),
    ScheduleController.delete
  );
};
