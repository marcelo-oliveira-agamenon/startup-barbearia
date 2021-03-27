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

export default paymentMovementRouter;
