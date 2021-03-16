import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import StockController from '../controllers/StockController';

const stockRouter = Router();
const stockController = new StockController();

stockRouter.post(
  '/signup',
  celebrate({
    [Segments.BODY]: {
      product_id: Joi.string().required(),
      quantity: Joi.number()
    }
  }),
  stockController.create
);

stockRouter.get(
  '/:product_id',
  celebrate({
    [Segments.PARAMS]: {
      product_id: Joi.string().uuid().required()
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
export default stockRouter;
