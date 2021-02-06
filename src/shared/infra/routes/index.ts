import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (res: Request, req: Response) => {
  console.log('dasdasd', req, res);
});

export default router;
