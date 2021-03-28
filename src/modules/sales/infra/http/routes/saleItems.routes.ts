import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SaleItemsController from '@modules/sales/infra/http/controllers/SaleItemsController';

const saleItemsRouter = Router();
const saleItemsController = new SaleItemsController();

saleItemsRouter.post(
  '/signup',
  celebrate({
    [Segments.BODY]: {
      sale_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
      product_id: Joi.string().uuid({ version: 'uuidv4' }),
      service_id: Joi.string()
        .uuid({ version: 'uuidv4' })
        .when('product_id', {
          is: Joi.exist(),
          then: Joi.forbidden(),
          otherwise: Joi.required()
        })
        .when('quantity', {
          is: Joi.exist(),
          then: Joi.forbidden(),
          otherwise: Joi.required()
        }),
      quantity: Joi.number().integer().positive().when('product_id', {
        is: Joi.exist(),
        then: Joi.required(),
        otherwise: Joi.forbidden()
      }),
      value: Joi.number().positive().required()
    }
  }),
  saleItemsController.create
);

saleItemsRouter.get(
  '/:sale_items_id',
  celebrate({
    [Segments.PARAMS]: {
      sale_items_id: Joi.string().uuid({ version: 'uuidv4' }).required()
    }
  }),
  saleItemsController.get
);

saleItemsRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      limit: Joi.number().integer().positive(),
      offset: Joi.number().integer().positive()
    }
  }),
  saleItemsController.list
);

saleItemsRouter.put(
  '/:sale_items_id',
  celebrate({
    [Segments.BODY]: Joi.object()
      .keys({
        sale_id: Joi.string().uuid({ version: 'uuidv4' }),
        product_id: Joi.string().uuid({ version: 'uuidv4' }),
        service_id: Joi.string()
          .uuid({ version: 'uuidv4' })
          .when('product_id', {
            is: Joi.exist(),
            then: Joi.forbidden()
          })
          .when('quantity', {
            is: Joi.exist(),
            then: Joi.forbidden()
          }),
        quantity: Joi.number().integer().positive(),
        value: Joi.number().positive()
      })
      .min(1),
    [Segments.PARAMS]: {
      sale_items_id: Joi.string().uuid({ version: 'uuidv4' }).required()
    }
  }),
  saleItemsController.update
);

// saleItemsRouter.delete(
//   '/:sale_id',
//   celebrate({
//     [Segments.PARAMS]: {
//       sale_id: Joi.string().uuid({ version: 'uuidv4' }).required()
//     }
//   }),
//   saleItemsController.delete
// );

export default saleItemsRouter;
