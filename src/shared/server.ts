/* eslint-disable no-console */
import 'reflect-metadata';
import 'dotenv/config';
import 'shared/container';
import 'express-async-errors';
import { createConnection } from 'typeorm';
import config from '@shared/infra/typeorm/ormconfig';
import app from '@shared/infra/config/app';

createConnection(config)
  .then(async () => {
    app.listen(process.env.PORT, () => {
      console.log('Server listening on PORT:', process.env.PORT);
    });
  })
  .catch(console.error);
