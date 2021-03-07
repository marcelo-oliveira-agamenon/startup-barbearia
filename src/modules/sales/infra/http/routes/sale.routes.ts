import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SaleController from '@modules/sales/infra/http/controllers/SaleController';

const saleRouter = Router();
const saleController = new SaleController();

saleRouter.post(
  '/signup',
  celebrate({
    [Segments.BODY]: {
      client_id: Joi.string(),
      user_id: Joi.string(),
      valor_total: Joi.number().positive(),
      discount: Joi.number().positive()
    }
  }),
  saleController.create
);

saleRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      limit: Joi.number().integer().positive(),
      offset: Joi.number().integer().positive()
    }
  }),
  saleController.list
);

saleRouter.get(
  '/:sale_id',
  celebrate({
    [Segments.PARAMS]: {
      sale_id: Joi.string().required()
    }
  }),
  saleController.get
);

saleRouter.delete(
  '/:sale_id',
  celebrate({
    [Segments.PARAMS]: {
      sale_id: Joi.string().required()
    }
  }),
  saleController.delete
);

export default saleRouter;
