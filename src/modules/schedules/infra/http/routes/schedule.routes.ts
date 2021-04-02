import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ScheduleController from '@modules/schedules/infra/http/controllers/ScheduleController';

export default (router: Router): void => {
  const scheduleRouter = Router();

  router.use('/schedules', scheduleRouter);

  scheduleRouter.get(
    '/client/:client_id',
    celebrate({
      [Segments.PARAMS]: {
        client_id: Joi.string().uuid({ version: 'uuidv4' }).required()
      }
    }),
    ScheduleController.getByClient
  );

  scheduleRouter.get(
    '/user/:user_id',
    celebrate({
      [Segments.PARAMS]: {
        user_id: Joi.string().uuid({ version: 'uuidv4' }).required()
      }
    }),
    ScheduleController.getByUser
  );

  scheduleRouter.get(
    '/date/filter',
    celebrate({
      [Segments.BODY]: {
        start_date: Joi.date().required(),
        end_date: Joi.date().min(Joi.ref('start_date')).required()
      }
    }),
    ScheduleController.getByDate
  );

  scheduleRouter.get(
    '/',
    celebrate({
      [Segments.QUERY]: {
        limit: Joi.number().integer().positive(),
        offset: Joi.number().integer().positive()
      }
    }),
    ScheduleController.list
  );

  scheduleRouter.post(
    '/register',
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

  scheduleRouter
    .route('/:schedule_id')
    .get(
      celebrate({
        [Segments.PARAMS]: {
          schedule_id: Joi.string().uuid({ version: 'uuidv4' }).required()
        }
      }),
      ScheduleController.get
    )
    .put(
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
    )
    .delete(
      celebrate({
        [Segments.PARAMS]: {
          schedule_id: Joi.string().uuid({ version: 'uuidv4' }).required()
        }
      }),
      ScheduleController.delete
    );
};
