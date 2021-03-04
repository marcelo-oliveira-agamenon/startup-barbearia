import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PaymentMethodController from '@modules/sales/infra/http/controllers/PaymentMethodController';

const paymentMethodRouter = Router();
const paymentMethodController = new PaymentMethodController();

paymentMethodRouter.post(
  '/signup',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      is_active: Joi.boolean()
    }
  }),
  paymentMethodController.create
);

paymentMethodRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      limit: Joi.number(),
      offset: Joi.number()
    }
  }),
  paymentMethodController.list
);

paymentMethodRouter.get(
  '/:payment_method_id',
  celebrate({
    [Segments.PARAMS]: {
      payment_method_id: Joi.number().required()
    }
  }),
  paymentMethodController.get
);

paymentMethodRouter.delete(
  '/:payment_method_id',
  celebrate({
    [Segments.PARAMS]: {
      payment_method_id: Joi.number().required()
    }
  }),
  paymentMethodController.delete
);

paymentMethodRouter.put(
  '/:payment_method_id',
  celebrate({
    [Segments.PARAMS]: {
      payment_method_id: Joi.number().required()
    },
    [Segments.BODY]: Joi.object()
      .keys({
        name: Joi.string(),
        is_active: Joi.boolean()
      })
      .min(1)
  }),
  paymentMethodController.update
);

export default paymentMethodRouter;
