import 'reflect-metadata';

import { Router } from 'express';
import userRouter from '@modules/users/infra/http/routes/user.routes';
import clientRouter from '@modules/users/infra/http/routes/client.routes';

const router = Router();

router.use('/users', userRouter);
router.use('/clients', clientRouter);

export default router;
