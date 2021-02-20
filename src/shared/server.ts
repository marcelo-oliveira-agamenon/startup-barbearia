import 'reflect-metadata';
import 'dotenv/config';
import 'shared/container';
import express from 'express';
import Routes from '@shared/infra/routes/index';
import config from '@shared/infra/typeorm/ormconfig';
import { createConnection } from 'typeorm';
import { errorHandler } from '@shared/errors/AppError';
import { errors } from 'celebrate';
import cors from 'cors';

(async () => {
  try {
    await createConnection(config);
  } catch (error) {
    console.log('Error while connecting to the database', error);
    return error;
  }

  const app = express();
  app.use(cors(), express.json(), Routes, errors());
  app.use(errorHandler);

  app.listen(process.env.PORT, () => {
    console.log('Server listening on PORT:', process.env.PORT);
  });
})();
