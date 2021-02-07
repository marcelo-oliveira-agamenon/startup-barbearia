import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UserController from '@modules/users/infra/http/controllers/UserController';

const userRouter = Router();
const userController = new UserController();

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      user_name: Joi.string().required(),
      user_type: Joi.string().required(),
      user_phone: Joi.string(),
      password: Joi.string().required()
    }
  }),
  userController.create
);

export default userRouter;
