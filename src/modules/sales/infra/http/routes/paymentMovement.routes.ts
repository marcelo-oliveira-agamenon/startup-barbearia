import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import PaymentMovementController from '../controllers/PaymentMovementController';

export default (router: Router): void => {
  const url = '/payment-movements';

  router.post(
    `${url}/signup`,
    celebrate({
      [Segments.BODY]: {
        sale_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
        payment_method_id: Joi.number().integer().required(),
        is_active: Joi.boolean(),
        value: Joi.number().positive()
      }
    }),
    PaymentMovementController.create
  );

  router.get(
    `${url}/:payment_movement_id`,
    celebrate({
      [Segments.PARAMS]: {
        payment_movement_id: Joi.string().uuid({ version: 'uuidv4' }).required()
      }
    }),
    PaymentMovementController.get
  );

  router.get(
    url,
    celebrate({
      [Segments.QUERY]: {
        limit: Joi.number().integer().positive(),
        offset: Joi.number().integer().positive()
      }
    }),
    PaymentMovementController.list
  );

  router.put(
    `${url}/:payment_movement_id`,
    celebrate({
      [Segments.PARAMS]: {
        payment_movement_id: Joi.string().uuid({ version: 'uuidv4' }).required()
      },
      [Segments.BODY]: Joi.object()
        .keys({
          value: Joi.number().integer().positive(),
          payment_method_id: Joi.number().integer().positive()
        })
        .min(1)
    }),
    PaymentMovementController.update
  );

  router.delete(
    `${url}/:payment_movement_id`,
    celebrate({
      [Segments.PARAMS]: {
        payment_movement_id: Joi.string().uuid({ version: 'uuidv4' }).required()
      }
    }),
    PaymentMovementController.delete
  );
};
