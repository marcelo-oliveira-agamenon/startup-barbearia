import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProductController from '@modules/sales/infra/http/controllers/ProductController';

export default (router: Router): void => {
  const productRouter = Router();

  router.use('/products', productRouter);

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
    ProductController.create
  );

  productRouter.get(
    '/',
    celebrate({
      [Segments.QUERY]: {
        limit: Joi.number().integer().positive(),
        offset: Joi.number().integer().positive()
      }
    }),
    ProductController.list
  );

  productRouter
    .route('/:product_id')
    .get(
      celebrate({
        [Segments.PARAMS]: {
          product_id: Joi.string().uuid({ version: 'uuidv4' }).required()
        }
      }),
      ProductController.get
    )
    .put(
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
      ProductController.update
    )
    .delete(
      celebrate({
        [Segments.PARAMS]: {
          product_id: Joi.string().uuid({ version: 'uuidv4' }).required()
        }
      }),
      ProductController.delete
    );
};
