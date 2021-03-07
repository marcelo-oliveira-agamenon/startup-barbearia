import 'reflect-metadata';

import { Router } from 'express';
import userRouter from '@modules/users/infra/http/routes/user.routes';
import clientRouter from '@modules/users/infra/http/routes/client.routes';
import productRouter from '@modules/sales/infra/http/routes/product.routes';
import serviceRouter from '@modules/sales/infra/http/routes/service.routes';
import paymentMethodRouter from '@modules/sales/infra/http/routes/paymentMethod.routes';
import saleRouter from '@modules/sales/infra/http/routes/sale.routes';

const router = Router();

router.use('/users', userRouter);
router.use('/clients', clientRouter);
router.use('/services', serviceRouter);
router.use('/products', productRouter);
router.use('/payment-methods', paymentMethodRouter);
router.use('/sales', saleRouter);

export default router;
