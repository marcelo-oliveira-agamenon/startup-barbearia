import 'reflect-metadata';
import 'shared/container';
import { errors } from 'celebrate';
import cors from 'cors';
import express from 'express';
import authentication from '@shared/infra/middlewares/authentication';
import authExceptions from '@shared/infra/middlewares/authExceptions';
import errorHandling from '@shared/infra/middlewares/errorHandling';
import routes from '@shared/infra/routes/index';

const app = express();
app.use(
  cors(),
  express.json(),
  authExceptions(authentication),
  routes,
  errorHandling,
  errors()
);

export default app;
