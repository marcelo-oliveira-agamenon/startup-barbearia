import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ServiceController from '@modules/sales/infra/http/controllers/ServiceController';

export default (router: Router): void => {
  const url = '/services';

  router.post(
    `${url}/signup`,
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        value: Joi.number().positive().required()
      }
    }),
    ServiceController.create
  );

  router.get(
    url,
    celebrate({
      [Segments.QUERY]: {
        limit: Joi.number().integer().positive(),
        offset: Joi.number().integer().positive()
      }
    }),
    ServiceController.list
  );

  router.get(
    `${url}/list/users`,
    celebrate({
      [Segments.QUERY]: {
        limit: Joi.number().integer().positive(),
        offset: Joi.number().integer().positive()
      }
    }),
    ServiceController.listWithUser
  );

  router.get(
    `${url}/:service_id`,
    celebrate({
      [Segments.PARAMS]: {
        service_id: Joi.string().uuid({ version: 'uuidv4' }).required()
      }
    }),
    ServiceController.get
  );

  router.delete(
    `${url}/:service_id`,
    celebrate({
      [Segments.PARAMS]: {
        service_id: Joi.string().uuid({ version: 'uuidv4' }).required()
      }
    }),
    ServiceController.delete
  );

  router.put(
    `${url}/:service_id`,
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
