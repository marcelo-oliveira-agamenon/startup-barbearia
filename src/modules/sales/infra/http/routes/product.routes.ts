import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProductController from '@modules/sales/infra/http/controllers/ProductController';

export default (router: Router): void => {
  const url = '/products';

  router.post(
    `${url}/signup`,
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

  router.get(
    url,
    celebrate({
      [Segments.QUERY]: {
        limit: Joi.number().integer().positive(),
        offset: Joi.number().integer().positive()
      }
    }),
    ProductController.list
  );

  router.get(
    `${url}/:product_id`,
    celebrate({
      [Segments.PARAMS]: {
        product_id: Joi.string().uuid({ version: 'uuidv4' }).required()
      }
    }),
    ProductController.get
  );

  router.put(
    `${url}/:product_id`,
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
  );

  router.delete(
    `${url}/:product_id`,
    celebrate({
      [Segments.PARAMS]: {
        product_id: Joi.string().uuid({ version: 'uuidv4' }).required()
      }
    }),
    ProductController.delete
  );
};
