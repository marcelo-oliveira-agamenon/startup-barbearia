import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import StockController from '@modules/sales/infra/http/controllers/StockController';

export default (router: Router): void => {
  const stockRouter = Router();

  router.use('/stocks', stockRouter);
  stockRouter.post(
    '/signup',
    celebrate({
      [Segments.BODY]: {
        product_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
        quantity: Joi.number().integer().min(0)
      }
    }),
    StockController.create
  );

  stockRouter.get(
    '/',
    celebrate({
      [Segments.QUERY]: {
        limit: Joi.number().integer().positive(),
        offset: Joi.number().integer().positive()
      }
    }),
    StockController.list
  );

  stockRouter.get(
    '/:product_id',
    celebrate({
      [Segments.PARAMS]: {
        product_id: Joi.string().uuid({ version: 'uuidv4' }).required()
      }
    }),
    StockController.get
  );

  stockRouter
    .route('/:stock_id')
    .put(
      celebrate({
        [Segments.PARAMS]: {
          stock_id: Joi.number().integer().positive().required()
        },
        [Segments.BODY]: {
          quantity: Joi.number().integer().min(0).required()
        }
      }),
      StockController.update
    )
    .delete(
      celebrate({
        [Segments.PARAMS]: {
          stock_id: Joi.number().integer().positive().required()
        }
      }),
      StockController.delete
    );
};
