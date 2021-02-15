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

export default userRouter;
