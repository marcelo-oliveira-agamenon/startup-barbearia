import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { UserRole } from '@modules/users/infra/typeorm/entities/User';
import UserController from '@modules/users/infra/http/controllers/UserController';

export default (router: Router): void => {
  const userRouter = Router();

  router.use('/users', userRouter);

  userRouter.post(
    '/signup',
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        user_type: Joi.string()
          .required()
          .valid(UserRole.ADMIN, UserRole.NORMAL),
        phone: Joi.string(),
        cpf: Joi.string().length(14),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(5).max(12),
        confirmPassword: Joi.string().required().valid(Joi.ref('password')),
        is_active: Joi.boolean()
      }
    }),
    UserController.create
  );

  userRouter
    .route('/:user_id')
    .put(
      celebrate({
        [Segments.PARAMS]: {
          user_id: Joi.string().uuid({ version: 'uuidv4' }).required()
        },
        [Segments.BODY]: Joi.object()
          .keys({
            name: Joi.string(),
            user_type: Joi.string().valid(UserRole.ADMIN, UserRole.NORMAL),
            phone: Joi.string(),
            cpf: Joi.string().length(14),
            email: Joi.string().email(),
            password: Joi.string().min(5).max(12),
            confirmPassword: Joi.string()
              .valid(Joi.ref('password'))
              .when('password', {
                is: Joi.exist(),
                then: Joi.required()
              }),
            is_active: Joi.boolean()
          })
          .min(1)
      }),
      UserController.update
    )
    .delete(
      celebrate({
        [Segments.PARAMS]: {
          user_id: Joi.string().uuid({ version: 'uuidv4' }).required()
        }
      }),
      UserController.delete
    )
    .get(
      celebrate({
        [Segments.PARAMS]: {
          user_id: Joi.string().uuid({ version: 'uuidv4' }).required()
        }
      }),
      UserController.get
    );

  userRouter
    .route('/')
    .get(
      celebrate({
        [Segments.QUERY]: {
          limit: Joi.number().integer().positive(),
          offset: Joi.number().integer().positive()
        }
      }),
      UserController.list
    )
    .post(
      celebrate({
        [Segments.BODY]: {
          email: Joi.string().email(),
          password: Joi.string().min(5).max(12)
        }
      }),
      UserController.signIn
    );

  userRouter.get(
    '/list/services',
    celebrate({
      [Segments.QUERY]: {
        limit: Joi.number().integer().positive(),
        offset: Joi.number().integer().positive()
      }
    }),
    UserController.listServices
  );
};
