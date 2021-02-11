import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ClientController from '@modules/users/infra/http/controllers/ClientController';

const clientRouter = Router();
const clientController = new ClientController();

clientRouter.post(
  '/register',
  celebrate({
    [Segments.BODY]: {
        client_name: Joi.string().required(),
        client_cpf: Joi.string(),
        client_phone: Joi.string(),
        client_email: Joi.string()
    }
  }),
  clientController.create
);

export default clientRouter;
