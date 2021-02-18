import 'reflect-metadata';

import { Router } from 'express';
import userRouter from '@modules/users/infra/http/routes/user.routes';
import serviceRouter from '@modules/sales/infra/http/routes/services.routes';

const router = Router();

router.use('/users', userRouter);
router.use('/services', serviceRouter);

export default router;
