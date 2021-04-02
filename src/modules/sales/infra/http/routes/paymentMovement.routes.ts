import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import PaymentMovementController from '../controllers/PaymentMovementController';

export default (router: Router): void => {
  const paymentMovementRouter = Router();

  router.use('/payment-movements', paymentMovementRouter);

  paymentMovementRouter.post(
    '/signup',
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

  paymentMovementRouter.get(
    '/',
    celebrate({
      [Segments.QUERY]: {
        limit: Joi.number().integer().positive(),
        offset: Joi.number().integer().positive()
      }
    }),
    PaymentMovementController.list
  );

  paymentMovementRouter
    .route('/:payment_movement_id')
    .get(
      celebrate({
        [Segments.PARAMS]: {
          payment_movement_id: Joi.string()
            .uuid({ version: 'uuidv4' })
            .required()
        }
      }),
      PaymentMovementController.get
    )
    .put(
      celebrate({
        [Segments.PARAMS]: {
          payment_movement_id: Joi.string()
            .uuid({ version: 'uuidv4' })
            .required()
        },
        [Segments.BODY]: Joi.object()
          .keys({
            value: Joi.number().integer().positive(),
            payment_method_id: Joi.number().integer().positive()
          })
          .min(1)
      }),
      PaymentMovementController.update
    )
    .delete(
      celebrate({
        [Segments.PARAMS]: {
          payment_movement_id: Joi.string()
            .uuid({ version: 'uuidv4' })
            .required()
        }
      }),
      PaymentMovementController.delete
    );
};
