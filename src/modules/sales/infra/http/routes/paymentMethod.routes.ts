import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PaymentMethodController from '@modules/sales/infra/http/controllers/PaymentMethodController';

export default (router: Router): void => {
  const paymentMethodRouter = Router();

  router.use('/payment-methods', paymentMethodRouter);

  paymentMethodRouter.post(
    '/signup',
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        is_active: Joi.boolean()
      }
    }),
    PaymentMethodController.create
  );

  paymentMethodRouter.get(
    '/',
    celebrate({
      [Segments.QUERY]: {
        limit: Joi.number().integer().positive(),
        offset: Joi.number().integer().positive()
      }
    }),
    PaymentMethodController.list
  );

  paymentMethodRouter
    .route('/:payment_method_id')
    .get(
      celebrate({
        [Segments.PARAMS]: {
          payment_method_id: Joi.number().integer().positive().required()
        }
      }),
      PaymentMethodController.get
    )
    .delete(
      celebrate({
        [Segments.PARAMS]: {
          payment_method_id: Joi.number().integer().positive().required()
        }
      }),
      PaymentMethodController.delete
    )
    .put(
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
