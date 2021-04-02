import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SaleController from '@modules/sales/infra/http/controllers/SaleController';

export default (router: Router): void => {
  const saleRouter = Router();

  router.use('/sales', saleRouter);

  saleRouter.post(
    '/signup',
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

  saleRouter.get(
    '/',
    celebrate({
      [Segments.QUERY]: {
        limit: Joi.number().integer().positive(),
        offset: Joi.number().integer().positive()
      }
    }),
    SaleController.list
  );

  saleRouter
    .route('/:sale_id')
    .get(
      celebrate({
        [Segments.PARAMS]: {
          sale_id: Joi.string().uuid({ version: 'uuidv4' }).required()
        }
      }),
      SaleController.get
    )
    .put(
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
    )
    .delete(
      celebrate({
        [Segments.PARAMS]: {
          sale_id: Joi.string().uuid({ version: 'uuidv4' }).required()
        }
      }),
      SaleController.delete
    );
};
