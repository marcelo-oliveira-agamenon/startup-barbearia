import 'reflect-metadata';

import { Router } from 'express';
import userRouter from '@modules/users/infra/http/routes/user.routes';
import clientRouter from '@modules/users/infra/http/routes/client.routes';
import serviceRouter from '@modules/sales/infra/http/routes/services.routes';
import productRouter from '@modules/sales/infra/http/routes/product.routes';

const router = Router();

router.use('/users', userRouter);
router.use('/clients', clientRouter);
router.use('/services', serviceRouter);
router.use('/products', productRouter);

export default router;
