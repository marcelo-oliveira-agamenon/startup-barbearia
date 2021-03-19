/* eslint-disable no-console */
import AppError from '@shared/errors/AppError';
import { errors, isCelebrateError } from 'celebrate';
import { Request, Response, NextFunction } from 'express';

export default function (
  error: Error,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  if (error instanceof AppError) {
    return response
      .status(error.status)
      .json({ status: 'Client error', message: error.description });
  } else if (isCelebrateError(error)) {
    console.error(error);
    next(error);
  } else {
    console.error(error);
    return response.status(500).json({
      status: 'Server error',
      message: 'Internal server error'
    });
  }
}
