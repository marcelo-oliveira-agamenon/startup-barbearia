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
      limit: Joi.number(),
      offset: Joi.number()
    }
  }),
  serviceController.list
);

serviceRouter.get(
  '/:service_id',
  celebrate({
    [Segments.PARAMS]: {
      service_id: Joi.string().required()
    }
  }),
  serviceController.get
);

serviceRouter.delete(
  '/:service_id',
  celebrate({
    [Segments.PARAMS]: {
      service_id: Joi.string().required()
    }
  }),
  serviceController.delete
);

serviceRouter.put(
  '/:service_id',
  celebrate({
    [Segments.PARAMS]: {
      service_id: Joi.string().required()
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      value: Joi.number().required()
    }
  }),
  serviceController.update
);

export default serviceRouter;
