import 'reflect-metadata';
import 'shared/container';
import 'dotenv/config';
import config from '@shared/infra/typeorm/ormconfig';
import request from 'supertest';

import { container } from 'tsyringe';
import { Connection, createConnection } from 'typeorm';
import app from '@shared/infra/config/app';
import PaymentMovementClass from './paymentMovement-class';
import SaleClass from './sale-class';
import PaymentMethodClass from './paymentMethod-class';
import { CreatePaymentMethodService } from '@modules/sales/services/paymentMethod';
import { CreateSaleService } from '@modules/sales/services/sale';
import { CreateClientService } from '@modules/users/services/client';
import ClientClass from '../users/client-class';
import { CreateUserService } from '@modules/users/services/user';
import UserClass from '../users/user-class';
import PaymentMethod from '@modules/sales/infra/typeorm/entities/PaymentMethod';

const TOKEN = `Bearer ${process.env.TOKEN}`;
let connection: Connection;

// const createEndPoint = '/paymentMovement/signup',
//   listEndPoint = '/paymentMovement/';
// let commonEndPoint = '/paymentMovement/';
// let updateEndPoint = '/paymentMovement/';

const paymentMovementClass = new PaymentMovementClass();
const paymentMethodClass = new PaymentMethodClass();
const saleClass = new SaleClass();
const clientClass = new ClientClass();
const userClass = new UserClass();

const createEndPoint = '/payment-movements/signup';
let commonEndPoint = '/payment-movements/';

describe('POST/GET/DELETE /sales/', function () {
  beforeAll(async () => {
    connection = await createConnection(config);

    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute(userClass);

    const createClient = container.resolve(CreateClientService);
    const client = await createClient.execute(clientClass);

    const createPaymentMethod = container.resolve(CreatePaymentMethodService);
    const paymentMethod = await createPaymentMethod.execute(paymentMethodClass);

    if (user) {
      const createSale = container.resolve(CreateSaleService);
      saleClass.user_id = user.user_id;
      const sale = await createSale.execute(saleClass);
      if (sale) paymentMovementClass.sale_id = sale.sale_id;
    }

    if (paymentMethod)
      paymentMovementClass.payment_method_id = paymentMethod.payment_method_id;
  });
  afterAll(async () => {
    await connection.close();
  });
  it('Should create a payment movement with all input fields and return {payment movement}.', function (done) {
    request(app)
      .post(createEndPoint)
      .set('Authorization', TOKEN)
      .send(paymentMovementClass.createRequest)
      .expect('Content-Type', /json/)
      .expect(PaymentMethod)
      .expect(201)
      .expect((res) => {
        commonEndPoint += res.body.sale_id;
        expect(res.body).toEqual(
          expect.objectContaining(paymentMovementClass.createResponse)
        );
      })
      .end(done);
  });
});
