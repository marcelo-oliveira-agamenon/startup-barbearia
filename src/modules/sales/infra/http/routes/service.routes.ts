import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ServiceController from '@modules/sales/infra/http/controllers/ServiceController';

export default (router: Router): void => {
  const serviceRouter = Router();

  router.use('/services', serviceRouter);

  serviceRouter.post(
    '/signup',
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        value: Joi.number().positive().required()
      }
    }),
    ServiceController.create
  );

  serviceRouter.get(
    '/',
    celebrate({
      [Segments.QUERY]: {
        limit: Joi.number().integer().positive(),
        offset: Joi.number().integer().positive()
      }
    }),
    ServiceController.list
  );

  serviceRouter.get(
    '/list/users',
    celebrate({
      [Segments.QUERY]: {
        limit: Joi.number().integer().positive(),
        offset: Joi.number().integer().positive()
      }
    }),
    ServiceController.listWithUser
  );

  serviceRouter
    .route('/:service_id')
    .get(
      celebrate({
        [Segments.PARAMS]: {
          service_id: Joi.string().uuid({ version: 'uuidv4' }).required()
        }
      }),
      ServiceController.get
    )
    .delete(
      celebrate({
        [Segments.PARAMS]: {
          service_id: Joi.string().uuid({ version: 'uuidv4' }).required()
        }
      }),
      ServiceController.delete
    )
    .put(
      celebrate({
        [Segments.PARAMS]: {
          service_id: Joi.string().uuid({ version: 'uuidv4' }).required()
        },
        [Segments.BODY]: Joi.object()
          .keys({
            name: Joi.string(),
            value: Joi.number().positive()
          })
          .min(1)
      }),
      ServiceController.update
    );
};
