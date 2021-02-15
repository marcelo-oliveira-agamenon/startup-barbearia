import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UserController from '@modules/users/infra/http/controllers/UserController';

const userRouter = Router();
const userController = new UserController();

userRouter.post(
  '/register',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      user_type: Joi.string().required(),
      phone: Joi.string(),
      cpf: Joi.string().length(14).required(),
      email: Joi.string(),
      password: Joi.string().required().min(5).max(12),
      is_active: Joi.boolean()
    }
  }),
  userController.create
);
export default userRouter;
