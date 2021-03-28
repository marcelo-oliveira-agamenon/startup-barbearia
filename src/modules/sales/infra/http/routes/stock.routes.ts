import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import StockController from '../controllers/StockController';

const stockRouter = Router();
const stockController = new StockController();

stockRouter.post(
  '/signup',
  celebrate({
    [Segments.BODY]: {
      product_id: Joi.string().uuid({ version: 'uuidv4' }).required(),
      quantity: Joi.number().integer().min(0)
    }
  }),
  stockController.create
);

stockRouter.get(
  '/:product_id',
  celebrate({
    [Segments.PARAMS]: {
      product_id: Joi.string().uuid({ version: 'uuidv4' }).required()
    }
  }),
  stockController.get
);

stockRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      limit: Joi.number().integer().positive(),
      offset: Joi.number().integer().positive()
    }
  }),
  stockController.list
);

stockRouter.put(
  '/:stock_id',
  celebrate({
    [Segments.PARAMS]: {
      stock_id: Joi.number().integer().positive().required()
    },
    [Segments.BODY]: {
      quantity: Joi.number().integer().min(0).required()
    }
  }),
  stockController.update
);

stockRouter.delete(
  '/:stock_id',
  celebrate({
    [Segments.PARAMS]: {
      stock_id: Joi.number().integer().positive().required()
    }
  }),
  stockController.delete
);

export default stockRouter;
