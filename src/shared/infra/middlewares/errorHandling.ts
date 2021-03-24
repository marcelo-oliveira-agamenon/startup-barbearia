/* eslint-disable no-console */
import AppError from '@shared/errors/AppError';
import { isCelebrateError } from 'celebrate';
import { Request, Response, NextFunction } from 'express';
import { QueryFailedError } from 'typeorm';

export default function (
  error: Error,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  console.error(error);

  if (error instanceof AppError) {
    return response
      .status(error.status)
      .json({ status: 'Client error', message: error.description });
  } else if (isCelebrateError(error)) {
    next(error);
  } else if (error instanceof QueryFailedError) {
    return response.status(500).json({
      status: error.name,
      message: `Unexpected error: ${error.message}`
    });
  } else {
    return response.status(500).json({
      status: 'Server error',
      message: 'Internal server error'
    });
  }
}
