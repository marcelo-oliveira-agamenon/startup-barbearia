import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UserController from '@modules/users/infra/http/controllers/UserController';

import { UserRole } from '@modules/users/infra/typeorm/entities/User';

const userRouter = Router();
const userController = new UserController();

userRouter.post(
  '/signup',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      user_type: Joi.string().required().valid(UserRole.ADMIN, UserRole.NORMAL),
      phone: Joi.string(),
      cpf: Joi.string().length(14),
      email: Joi.string().required(),
      password: Joi.string().required().min(5).max(12),
      confirmPassword: Joi.string().required().valid(Joi.ref('password')),
      is_active: Joi.boolean()
    }
  }),
  userController.create
);

userRouter.put(
  '/:user_id',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().required()
    },
    [Segments.BODY]: Joi.object()
      .keys({
        name: Joi.string(),
        user_type: Joi.string().valid(UserRole.ADMIN, UserRole.NORMAL),
        phone: Joi.string(),
        cpf: Joi.string().length(14),
        email: Joi.string(),
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
  userController.update
);

userRouter.delete(
  '/:user_id',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().required()
    }
  }),
  userController.delete
);

userRouter.get(
  '/:user_id',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().required()
    }
  }),
  userController.get
);

userRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      limit: Joi.number().integer().positive(),
      offset: Joi.number().integer().positive()
    }
  }),
  userController.list
);

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string(),
      password: Joi.string().min(5).max(12)
    }
  }),
  userController.signIn
);

export default userRouter;
