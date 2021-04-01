import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import StockController from '../controllers/StockController';

export default (router: Router): void => {
  const url = '/stocks';
  router.post(
    `${url}/signup`,
    celebrate({
      [Segments.BODY]: {
        product_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
        quantity: Joi.number().integer().min(0)
      }
    }),
    StockController.create
  );

  router.get(
    `${url}/:product_id`,
    celebrate({
      [Segments.PARAMS]: {
        product_id: Joi.string().uuid({ version: 'uuidv4' }).required()
      }
    }),
    StockController.get
  );

  router.get(
    url,
    celebrate({
      [Segments.QUERY]: {
        limit: Joi.number().integer().positive(),
        offset: Joi.number().integer().positive()
      }
    }),
    StockController.list
  );

  router.put(
    `${url}/:stock_id`,
    celebrate({
      [Segments.PARAMS]: {
        stock_id: Joi.number().integer().positive().required()
      },
      [Segments.BODY]: {
        quantity: Joi.number().integer().min(0).required()
      }
    }),
    StockController.update
  );

  router.delete(
    `${url}/:stock_id`,
    celebrate({
      [Segments.PARAMS]: {
        stock_id: Joi.number().integer().positive().required()
      }
    }),
    StockController.delete
  );
};
