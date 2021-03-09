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
      cost: Joi.number(),
      value: Joi.number().required(),
      description: Joi.string(),
      discount: Joi.number()
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
      product_id: Joi.string().required()
    }
  }),
  productController.get
);

productRouter.put(
  '/:product_id',
  celebrate({
    [Segments.PARAMS]: {
      product_id: Joi.string().required()
    },
    [Segments.BODY]: Joi.object()
      .keys({
        name: Joi.string(),
        cost: Joi.number(),
        value: Joi.number(),
        description: Joi.string(),
        discount: Joi.number()
      })
      .min(1)
  }),
  productController.update
);

productRouter.delete(
  '/:product_id',
  celebrate({
    [Segments.PARAMS]: {
      product_id: Joi.string().required()
    }
  }),
  productController.delete
);

export default productRouter;
