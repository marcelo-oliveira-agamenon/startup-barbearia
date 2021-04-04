import { app, connection, request } from '../../config';

import PaymentMovementClass from '../factories/paymentMovement-class';
import PaymentMovement from '@modules/sales/infra/typeorm/entities/PaymentMovement';
import { makePaymentMovementSut } from '../factories';

const TOKEN = `Bearer ${process.env.TOKEN}`;

const createEndPoint = '/payment-movements/signup',
  listEndPoint = '/payment-movements/';

let commonEndPoint = '/payment-movements/';
let paymentMovementClass: PaymentMovementClass;

describe('POST/GET/DELETE /sales/', function () {
  beforeAll(async () => {
    await connection.create();
    paymentMovementClass = await makePaymentMovementSut();
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
