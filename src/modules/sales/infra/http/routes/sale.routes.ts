import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ServiceController from '@modules/sales/infra/http/controllers/ServiceController';

const serviceRouter = Router();
const serviceController = new ServiceController();

serviceRouter.post(
  '/signup',
  celebrate({
    [Segments.BODY]: {
      client_id: Joi.string(),
      user_id: Joi.string(),
      valor_total: Joi.number().positive(),
      discount: Joi.number().positive()
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
  '/:sale_id',
  celebrate({
    [Segments.PARAMS]: {
      sale_id: Joi.string().required()
    }
  }),
  serviceController.get
);

serviceRouter.delete(
  '/:sale_id',
  celebrate({
    [Segments.PARAMS]: {
      sale_id: Joi.string().required()
    }
  }),
  serviceController.delete
);

export default serviceRouter;
