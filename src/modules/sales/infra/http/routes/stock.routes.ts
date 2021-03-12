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

export default stockRouter;
