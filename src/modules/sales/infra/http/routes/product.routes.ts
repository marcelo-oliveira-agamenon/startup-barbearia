import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProductController from '@modules/sales/infra/http/controllers/ProductController';

const productRouter = Router();
const productController = new ProductController();

productRouter.post(
  '/signup',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      cost: Joi.number().positive(),
      value: Joi.number().positive().required(),
      description: Joi.string(),
      discount: Joi.number().positive()
    }
  }),
  productController.create
);

productRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      limit: Joi.number().integer().positive(),
      offset: Joi.number().integer().positive()
    }
  }),
  productController.list
);

productRouter.get(
  '/:product_id',
  celebrate({
    [Segments.PARAMS]: {
      product_id: Joi.string().uuid({ version: 'uuidv4' }).required()
    }
  }),
  productController.get
);

productRouter.put(
  '/:product_id',
  celebrate({
    [Segments.PARAMS]: {
      product_id: Joi.string().uuid({ version: 'uuidv4' }).required()
    },
    [Segments.BODY]: Joi.object()
      .keys({
        name: Joi.string(),
        cost: Joi.number().positive(),
        value: Joi.number().positive(),
        description: Joi.string(),
        discount: Joi.number().positive()
      })
      .min(1)
  }),
  productController.update
);

productRouter.delete(
  '/:product_id',
  celebrate({
    [Segments.PARAMS]: {
      product_id: Joi.string().uuid({ version: 'uuidv4' }).required()
    }
  }),
  productController.delete
);

export default productRouter;
