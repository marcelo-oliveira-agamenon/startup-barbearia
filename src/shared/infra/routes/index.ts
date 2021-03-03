import 'reflect-metadata';

import { Router } from 'express';
import userRouter from '@modules/users/infra/http/routes/user.routes';
import clientRouter from '@modules/users/infra/http/routes/client.routes';
import serviceRouter from '@modules/sales/infra/http/routes/service.routes';
import scheduleRouter from '@modules/schedules/infra/http/routes/schedule.routes';
import paymentMethodRouter from '@modules/sales/infra/http/routes/paymentMethod.routes';

const router = Router();

router.use('/users', userRouter);
router.use('/clients', clientRouter);
router.use('/services', serviceRouter);
router.use('/payment-methods', paymentMethodRouter);

export default router;
