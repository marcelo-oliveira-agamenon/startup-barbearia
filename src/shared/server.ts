/* eslint-disable no-console */
import 'reflect-metadata';
import 'dotenv/config';
import 'shared/container';
import 'express-async-errors';
import { createConnection } from 'typeorm';
import config from '@shared/infra/typeorm/ormconfig';

createConnection(config)
  .then(async () => {
    const express = (await import('express')).default;
    const cors = (await import('cors')).default;
    const routes = (await import('@shared/infra/routes/index')).default;
    const errorHandling = (
      await import('@shared/infra/middlewares/errorHandling')
    ).default;
    const authentication = (
      await import('@shared/infra/middlewares/authentication')
    ).default;
    const authExceptions = (
      await import('@shared/infra/middlewares/authExceptions')
    ).default;
    const { errors } = await import('celebrate');

    const app = express();

    app.use(
      cors(),
      express.json(),
      authExceptions(authentication),
      routes,
      errorHandling,
      errors()
    );
    app.listen(process.env.PORT, () => {
      console.log('Server listening on PORT:', process.env.PORT);
    });
  })
  .catch(console.error);
