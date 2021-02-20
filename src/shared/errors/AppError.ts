import { Request, Response, Errback, NextFunction } from 'express';

export class AppError extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export function errorHandler(
  err: Errback,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  if (err !== undefined) {
    return res.status(500).json('error');
  }

  next();
}
