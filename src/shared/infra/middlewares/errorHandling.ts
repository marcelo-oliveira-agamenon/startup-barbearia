import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';

export default function (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
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
