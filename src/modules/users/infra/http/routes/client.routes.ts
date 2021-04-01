import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ClientController from '@modules/users/infra/http/controllers/ClientController';

export default (router: Router): void => {
  const url = '/clients';

  router.post(
    `${url}/signup`,
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        cpf: Joi.string().length(14),
        phone: Joi.string(),
        email: Joi.string().email()
      }
    }),
    ClientController.create
  );

  router.get(
    `${url}/:client_id`,
    celebrate({
      [Segments.PARAMS]: {
        client_id: Joi.string().uuid({ version: 'uuidv4' }).required()
      }
    }),
    ClientController.get
  );

  router.get(
    url,
    celebrate({
      [Segments.QUERY]: {
        limit: Joi.number().integer().positive(),
        offset: Joi.number().integer().positive()
      }
    }),
    ClientController.list
  );

  router.put(
    `${url}/:client_id`,
    celebrate({
      [Segments.PARAMS]: {
        client_id: Joi.string().uuid({ version: 'uuidv4' }).required()
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
    ClientController.update
  );

  router.delete(
    `${url}/:client_id`,
    celebrate({
      [Segments.PARAMS]: {
        client_id: Joi.string().uuid({ version: 'uuidv4' }).required()
      }
    }),
    ClientController.delete
  );
};
