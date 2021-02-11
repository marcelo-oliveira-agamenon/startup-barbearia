import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ServicesController from '@modules/sales/infra/http/controllers/ServicesController';

const serviceRouter = Router();
const serviceController = new ServicesController();

serviceRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      value: Joi.number().required()
    }
  }),
  serviceController.create
);

export default serviceRouter;
