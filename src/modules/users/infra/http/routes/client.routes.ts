import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ClientController from '@modules/users/infra/http/controllers/ClientController';

export default (router: Router): void => {
  const clientRouter = Router();

  router.use('/clients', clientRouter);

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
    ClientController.create
  );

  clientRouter.get(
    '/',
    celebrate({
      [Segments.QUERY]: {
        limit: Joi.number().integer().positive(),
        offset: Joi.number().integer().positive()
      }
    }),
    ClientController.list
  );

  clientRouter
    .route('/:client_id')
    .get(
      celebrate({
        [Segments.PARAMS]: {
          client_id: Joi.string().uuid({ version: 'uuidv4' }).required()
        }
      }),
      ClientController.get
    )
    .put(
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
    )
    .delete(
      celebrate({
        [Segments.PARAMS]: {
          client_id: Joi.string().uuid({ version: 'uuidv4' }).required()
        }
      }),
      ClientController.delete
    );
};
