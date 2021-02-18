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

export default clientRouter;
