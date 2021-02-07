import express from 'express';
import Routes from '@shared/infra/routes/index';
import 'reflect-metadata';
import 'dotenv/config';
import config from '@shared/infra/typeorm/ormconfig';
import { createConnection } from 'typeorm';

(async () => {
  try {
    await createConnection(config);
  } catch (error) {
    console.log('Error while connecting to the database', error);
    return error;
  }
  const app = express();

  app.use(Routes);

  app.listen(process.env.PORT, () => {
    console.log('Server listening on PORT:', process.env.PORT);
  });
})();
