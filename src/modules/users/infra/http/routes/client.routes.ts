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
      cpf: Joi.string().length(14),
      phone: Joi.string(),
      email: Joi.string().email()
    }
  }),
  clientController.create
);

clientRouter.get(
  '/:client_id',
  celebrate({
    [Segments.PARAMS]: {
      client_id: Joi.string().uuid().required()
    }
  }),
  clientController.get
);

clientRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      limit: Joi.number().integer().positive(),
      offset: Joi.number().integer().positive()
    }
  }),
  clientController.list
);

clientRouter.put(
  '/:client_id',
  celebrate({
    [Segments.PARAMS]: {
      client_id: Joi.string().uuid().required()
    },
    [Segments.BODY]: Joi.object()
      .keys({
        name: Joi.string(),
        phone: Joi.string(),
        cpf: Joi.string().length(14),
        email: Joi.string().email()
      })
      .min(1)
  }),
  clientController.update
);

clientRouter.delete(
  '/:client_id',
  celebrate({
    [Segments.PARAMS]: {
      client_id: Joi.string().uuid().required()
    }
  }),
  clientController.delete
);

export default clientRouter;
