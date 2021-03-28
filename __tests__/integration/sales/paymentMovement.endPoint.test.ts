import 'reflect-metadata';
import 'shared/container';
import 'dotenv/config';
import config from '@shared/infra/typeorm/ormconfig';
import request from 'supertest';

import { container } from 'tsyringe';
import { Connection, createConnection } from 'typeorm';
import app from '@shared/infra/config/app';
import PaymentMovementClass from '../factories/paymentMovement-class';
import PaymentMethodClass from '../factories/paymentMethod-class';
import { CreatePaymentMethodService } from '@modules/sales/services/paymentMethod';
import { CreateSaleService } from '@modules/sales/services/sale';
import { CreateClientService } from '@modules/users/services/client';
import { CreateUserService } from '@modules/users/services/user';
import SaleClass from '../factories/sale-class';
import ClientClass from '../factories/client-class';
import UserClass from '../factories/user-class';
import PaymentMovement from '@modules/sales/infra/typeorm/entities/PaymentMovement';

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

const createEndPoint = '/payment-movements/signup',
  listEndPoint = '/payment-movements/';

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
      .expect(PaymentMovement)
      .expect(201)
      .expect((res) => {
        commonEndPoint += res.body.payment_movement_id;
        expect(res.body).toEqual(
          expect.objectContaining(paymentMovementClass.createResponse)
        );
      })
      .end(done);
  });

  it('Should get a payment movement and return {payment movement}.', function (done) {
    request(app)
      .get(commonEndPoint)
      .set('Authorization', TOKEN)
      .expect('Content-Type', /json/)
      .expect(PaymentMovement)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining(paymentMovementClass.getResponse)
        );
      })
      .end(done);
  });

  it('Should list payment movement and return [{payment movement}].', function (done) {
    request(app)
      .get(listEndPoint)
      .set('Authorization', TOKEN)
      .query(paymentMovementClass.listRequest)
      .expect('Content-Type', /json/)
      .expect(PaymentMovement)
      .expect(200)
      .expect((res) => {
        if (res.body.length) {
          const firstElement = res.body[0];
          expect(firstElement).toHaveProperty('payment_movement_id');
          expect(firstElement).toHaveProperty('sale_id');
          expect(firstElement).toHaveProperty('payment_method_id');
          expect(firstElement).toHaveProperty('value');
          expect(firstElement).toHaveProperty('created_at');
          expect(firstElement).toHaveProperty('deleted_at');
        } else {
          expect(res.body).toEqual(expect.arrayContaining([]));
        }
      })
      .end(done);
  });

  it('Should update a payment movement and return {payment movement}.', function (done) {
    request(app)
      .put(commonEndPoint)
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .send(paymentMovementClass.updateRequest)
      .expect('Content-Type', /json/)
      .expect(PaymentMovement)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining(paymentMovementClass.updateResponse)
        );
      })
      .end(done);
  });

  it('Should delete a payment movement and return {payment movement}.', function (done) {
    request(app)
      .delete(commonEndPoint)
      .set('Authorization', TOKEN)
      .expect('Content-Type', /json/)
      .expect(PaymentMovement)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining(paymentMovementClass.deleteResponse)
        );
      })
      .end(done);
  });
});
