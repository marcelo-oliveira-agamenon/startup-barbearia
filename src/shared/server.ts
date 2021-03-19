import 'reflect-metadata';
import 'dotenv/config';
import 'shared/container';
import 'express-async-errors';
import express from 'express';
import Routes from '@shared/infra/routes/index';
import config from '@shared/infra/typeorm/ormconfig';
import { createConnection } from 'typeorm';
import { errors } from 'celebrate';
import cors from 'cors';
import authentication from '@shared/infra/middlewares/authentication';
import authExceptions from '@shared/infra/middlewares/authExceptions';
import errorHandling from '@shared/infra/middlewares/errorHandling';

(() => {
  createConnection(config);

  const app = express();
  app.use(
    cors(),
    express.json(),
    authExceptions(authentication),
    Routes,
    errorHandling,
    errors()
  );

  app.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log('Server listening on PORT:', process.env.PORT);
  });
})();
