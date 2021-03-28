import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import PaymentMovementController from '../controllers/PaymentMovementController';

const paymentMovementRouter = Router();
const paymentMovementController = new PaymentMovementController();

paymentMovementRouter.post(
  '/signup',
  celebrate({
    [Segments.BODY]: {
      sale_id: Joi.string().required(),
      payment_method_id: Joi.number().required(),
      is_active: Joi.boolean(),
      value: Joi.number()
    }
  }),
  paymentMovementController.create
);

paymentMovementRouter.get(
  '/:payment_movement_id',
  celebrate({
    [Segments.PARAMS]: {
      payment_movement_id: Joi.string().uuid().required()
    }
  }),
  paymentMovementController.get
);

paymentMovementRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      limit: Joi.number().integer().positive(),
      offset: Joi.number().integer().positive()
    }
  }),
  paymentMovementController.list
);

paymentMovementRouter.put(
  '/:payment_movement_id',
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
  paymentMovementController.update
);

paymentMovementRouter.delete(
  '/:payment_movement_id',
  celebrate({
    [Segments.PARAMS]: {
      payment_movement_id: Joi.string().uuid({ version: 'uuidv4' }).required()
    }
  }),
  paymentMovementController.delete
);

export default paymentMovementRouter;
