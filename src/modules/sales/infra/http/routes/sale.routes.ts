import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SaleController from '@modules/sales/infra/http/controllers/SaleController';

export default (router: Router): void => {
  const url = '/sales';

  router.post(
    `${url}/signup`,
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
    SaleController.create
  );

  router.get(
    `${url}/:sale_id`,
    celebrate({
      [Segments.PARAMS]: {
        sale_id: Joi.string().uuid({ version: 'uuidv4' }).required()
      }
    }),
    SaleController.get
  );

  router.get(
    url,
    celebrate({
      [Segments.QUERY]: {
        limit: Joi.number().integer().positive(),
        offset: Joi.number().integer().positive()
      }
    }),
    SaleController.list
  );

  router.put(
    `${url}/:sale_id`,
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
    SaleController.update
  );

  router.delete(
    `${url}/:sale_id`,
    celebrate({
      [Segments.PARAMS]: {
        sale_id: Joi.string().uuid({ version: 'uuidv4' }).required()
      }
    }),
    SaleController.delete
  );
};
