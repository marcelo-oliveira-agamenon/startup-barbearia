import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SaleItemsController from '@modules/sales/infra/http/controllers/SaleItemsController';

export default (router: Router): void => {
  const saleItemsRouter = Router();

  router.use('/sale-items', saleItemsRouter);

  saleItemsRouter.post(
    '/signup',
    celebrate({
      [Segments.BODY]: {
        sale_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
        product_id: Joi.string().uuid({ version: 'uuidv4' }),
        service_id: Joi.string()
          .uuid({ version: 'uuidv4' })
          .when('product_id', {
            is: Joi.exist(),
            then: Joi.forbidden(),
            otherwise: Joi.required()
          })
          .when('quantity', {
            is: Joi.exist(),
            then: Joi.forbidden(),
            otherwise: Joi.required()
          }),
        quantity: Joi.number().integer().positive().when('product_id', {
          is: Joi.exist(),
          then: Joi.required(),
          otherwise: Joi.forbidden()
        }),
        value: Joi.number().positive().required()
      }
    }),
    SaleItemsController.create
  );

  saleItemsRouter.get(
    '/',
    celebrate({
      [Segments.QUERY]: {
        limit: Joi.number().integer().positive(),
        offset: Joi.number().integer().positive()
      }
    }),
    SaleItemsController.list
  );

  saleItemsRouter
    .route('/:sale_items_id')
    .get(
      celebrate({
        [Segments.PARAMS]: {
          sale_items_id: Joi.string().uuid({ version: 'uuidv4' }).required()
        }
      }),
      SaleItemsController.get
    )
    .put(
      celebrate({
        [Segments.PARAMS]: {
          sale_items_id: Joi.string().uuid({ version: 'uuidv4' }).required()
        },
        [Segments.BODY]: Joi.object()
          .keys({
            sale_id: Joi.string().uuid({ version: 'uuidv4' }),
            product_id: Joi.string().uuid({ version: 'uuidv4' }),
            service_id: Joi.string()
              .uuid({ version: 'uuidv4' })
              .when('product_id', {
                is: Joi.exist(),
                then: Joi.valid(null)
              })
              .when('quantity', {
                is: Joi.exist(),
                then: Joi.valid(null)
              })
              .allow(null),
            quantity: Joi.number().integer().positive(),
            value: Joi.number().positive()
          })
          .min(1)
      }),
      SaleItemsController.update
    )
    .delete(
      celebrate({
        [Segments.PARAMS]: {
          sale_items_id: Joi.string().uuid({ version: 'uuidv4' }).required()
        }
      }),
      SaleItemsController.delete
    );
};
