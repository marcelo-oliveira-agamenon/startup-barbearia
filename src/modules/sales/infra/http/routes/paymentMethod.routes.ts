import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PaymentMethodController from '@modules/sales/infra/http/controllers/PaymentMethodController';

export default (router: Router): void => {
  const url = '/payment-methods';
  router.post(
    `${url}/signup`,
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        is_active: Joi.boolean()
      }
    }),
    PaymentMethodController.create
  );

  router.get(
    url,
    celebrate({
      [Segments.QUERY]: {
        limit: Joi.number().integer().positive(),
        offset: Joi.number().integer().positive()
      }
    }),
    PaymentMethodController.list
  );

  router.get(
    `${url}/:payment_method_id`,
    celebrate({
      [Segments.PARAMS]: {
        payment_method_id: Joi.number().integer().positive().required()
      }
    }),
    PaymentMethodController.get
  );

  router.delete(
    `${url}/:payment_method_id`,
    celebrate({
      [Segments.PARAMS]: {
        payment_method_id: Joi.number().integer().positive().required()
      }
    }),
    PaymentMethodController.delete
  );

  router.put(
    `${url}/:payment_method_id`,
    celebrate({
      [Segments.PARAMS]: {
        payment_method_id: Joi.number().integer().positive().required()
      },
      [Segments.BODY]: Joi.object()
        .keys({
          name: Joi.string(),
          is_active: Joi.boolean()
        })
        .min(1)
    }),
    PaymentMethodController.update
  );
};
