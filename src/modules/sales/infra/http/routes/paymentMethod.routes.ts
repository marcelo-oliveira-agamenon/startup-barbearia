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
  '/:service_id',
  celebrate({
    [Segments.PARAMS]: {
      service_id: Joi.string().required()
    }
  }),
  paymentMethodController.get
);

paymentMethodRouter.delete(
  '/:service_id',
  celebrate({
    [Segments.PARAMS]: {
      service_id: Joi.string().required()
    }
  }),
  paymentMethodController.delete
);

paymentMethodRouter.put(
  '/:service_id',
  celebrate({
    [Segments.PARAMS]: {
      service_id: Joi.string().required()
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      value: Joi.number().required()
    }
  }),
  paymentMethodController.update
);

export default paymentMethodRouter;
