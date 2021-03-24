import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ServiceController from '@modules/sales/infra/http/controllers/ServiceController';

const serviceRouter = Router();
const serviceController = new ServiceController();

serviceRouter.post(
  '/signup',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      value: Joi.number().required()
    }
  }),
  serviceController.create
);

serviceRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      limit: Joi.number().integer().positive(),
      offset: Joi.number().integer().positive()
    }
  }),
  serviceController.list
);

serviceRouter.get(
  '/list/users',
  celebrate({
    [Segments.QUERY]: {
      limit: Joi.number().integer().positive(),
      offset: Joi.number().integer().positive()
    }
  }),
  serviceController.listWithUser
);

serviceRouter.get(
  '/:service_id',
  celebrate({
    [Segments.PARAMS]: {
      service_id: Joi.string().uuid().required()
    }
  }),
  serviceController.get
);

serviceRouter.delete(
  '/:service_id',
  celebrate({
    [Segments.PARAMS]: {
      service_id: Joi.string().uuid().required()
    }
  }),
  serviceController.delete
);

serviceRouter.put(
  '/:service_id',
  celebrate({
    [Segments.PARAMS]: {
      service_id: Joi.string().uuid().required()
    },
    [Segments.BODY]: Joi.object()
      .keys({
        name: Joi.string(),
        value: Joi.number()
      })
      .min(1)
  }),
  serviceController.update
);

export default serviceRouter;
