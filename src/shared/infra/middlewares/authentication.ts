import { verify, decode } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export default function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
): NextFunction | Response | undefined {
  const bearerToken = req.header('Authorization');
  if (!bearerToken) return res.status(401).json('Access Denied');

  try {
    const secret: string =
      process.env.JWTSECRET === undefined ? '' : process.env.JWTSECRET;
    verify(bearerToken.replace('Bearer ', ''), secret);

    const obj = decode(bearerToken.replace('Bearer ', ''));

    if (obj !== null) {
      req.user = {
        type: obj['type'],
        user_id: obj['user_id']
      };
    }

    next();
  } catch {
    return res.status(401).json('Invalid token');
  }
}
