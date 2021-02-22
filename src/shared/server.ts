import 'reflect-metadata';
import 'dotenv/config';
import 'shared/container';
import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import Routes from '@shared/infra/routes/index';
import config from '@shared/infra/typeorm/ormconfig';
import { createConnection } from 'typeorm';
import { errors } from 'celebrate';
import cors from 'cors';
import AppError from '@shared/errors/AppError';
import authentication from '@shared/infra/middlewares/authentication';

function maybe(auth: Function) {
  return function (request: Request, response: Response, next: NextFunction) {
    const signInEndPoint =
      request.path === '/users/' && request.method === 'POST';
    if (signInEndPoint) {
      next();
    } else {
      auth(request, response, next);
    }
  };
}
(async () => {
  try {
    await createConnection(config);
  } catch (error) {
    console.log('Error while connecting to the database', error);
    return error;
  }

  const app = express();
  app.use(cors(), express.json(), maybe(authentication), Routes, errors());

  app.use(
    (
      error: Error,
      request: Request,
      response: Response,
      next: NextFunction
    ) => {
      if (error instanceof AppError) {
        return response
          .status(error.status)
          .json({ status: 'Client error', message: error.description });
      }
      console.error(error);
      return response.status(500).json({
        status: 'Server error',
        message: 'Internal server error'
      });
    }
  );

  app.listen(process.env.PORT, () => {
    console.log('Server listening on PORT:', process.env.PORT);
  });
})();
