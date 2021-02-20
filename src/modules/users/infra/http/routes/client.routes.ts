import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ClientController from '@modules/users/infra/http/controllers/ClientController';

const clientRouter = Router();
const clientController = new ClientController();

clientRouter.post(
  '/signup',
  celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        cpf: Joi.string(),
        phone: Joi.string(),
        email: Joi.string()
    }
  }),
  clientController.create
);

clientRouter.get(
  '/:client_id',
  celebrate({
    [Segments.PARAMS]: {
      client_id: Joi.string().required()
    }
  }),
  clientController.get
);

clientRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      limit: Joi.number(),
      offset: Joi.number()
    }
  }),
  clientController.list
);

clientRouter.put(
  '/:client_id',
  celebrate({
    [Segments.PARAMS]: {
      client_id: Joi.string().required()
    },
    [Segments.BODY]: Joi.object()
      .keys({
        name: Joi.string(),
        phone: Joi.string(),
        cpf: Joi.string().length(14),
        email: Joi.string(),
      })
      .min(1)
  }),
  clientController.update
);

export default clientRouter;
