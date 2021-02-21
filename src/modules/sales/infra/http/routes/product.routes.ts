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
        limit: Joi.number(),
        offset: Joi.number()
      }
    }),
    productController.list
  );

export default productRouter;