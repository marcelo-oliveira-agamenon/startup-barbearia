declare namespace Express {
  export interface Request {
    user?: {
      user_id: string | unknown;
      type: string;
    };
  }
}
