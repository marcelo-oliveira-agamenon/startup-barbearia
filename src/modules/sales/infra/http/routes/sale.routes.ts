import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SaleController from '@modules/sales/infra/http/controllers/SaleController';

const saleRouter = Router();
const saleController = new SaleController();

saleRouter.post(
  '/signup',
  celebrate({
    [Segments.BODY]: {
      client_id: Joi.string().uuid({ version: 'uuidv4' }),
      user_id: Joi.string().uuid({ version: 'uuidv4' }),
      value: Joi.number().positive().required(),
      discount: Joi.number().positive(),
      is_discount_fixed: Joi.boolean().when('discount', {
        is: Joi.exist(),
        then: Joi.required()
      })
    }
  }),
  saleController.create
);

saleRouter.get(
  '/:sale_id',
  celebrate({
    [Segments.PARAMS]: {
      sale_id: Joi.string().uuid({ version: 'uuidv4' }).required()
    }
  }),
  saleController.get
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

saleRouter.put(
  '/:sale_id',
  celebrate({
    [Segments.BODY]: Joi.object()
      .keys({
        client_id: Joi.string().uuid({ version: 'uuidv4' }),
        user_id: Joi.string().uuid({ version: 'uuidv4' }),
        discount: Joi.number().positive(),
        is_discount_fixed: Joi.boolean().when('discount', {
          is: Joi.exist(),
          then: Joi.required()
        })
      })
      .min(1)
  }),
  saleController.update
);

saleRouter.delete(
  '/:sale_id',
  celebrate({
    [Segments.PARAMS]: {
      sale_id: Joi.string().uuid({ version: 'uuidv4' }).required()
    }
  }),
  saleController.delete
);

export default saleRouter;
