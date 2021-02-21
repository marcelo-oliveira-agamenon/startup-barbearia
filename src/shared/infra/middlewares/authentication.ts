import { verify, decode } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export default function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
): NextFunction | Response | undefined {
  const bearerToken = req.header('Authorization');
  if (!bearerToken)
    return res.status(401).json('Access Denied! You must have a token!');

  try {
    const secret: string =
      process.env.JWTSECRET === undefined ? '' : process.env.JWTSECRET;
    const token = bearerToken.replace('Bearer ', '');

    const isValidToken = verify(token, secret);

    if (!isValidToken) return res.status(401).json('Invalid Token');

    const obj = decode(token);

    if (obj) {
      req.user = {
        role: obj['role'],
        user_id: obj['user_id']
      };
    }

    next();
  } catch {
    return res.status(401).json('Something went wrong!');
  }
}
