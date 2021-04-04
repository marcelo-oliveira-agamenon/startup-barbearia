import { app, connection, request } from '../../config';

import PaymentMethod from '@modules/sales/infra/typeorm/entities/PaymentMethod';
import { makePaymentMethodSut } from '../factories';

const paymentMethodClass = makePaymentMethodSut();
const TOKEN = `Bearer ${process.env.TOKEN}`;

const createEndPoint = '/payment-methods/signup',
  listEndPoint = '/payment-methods/';
let commonEndPoint = '/payment-methods/';

describe('POST/GET/PUT/DELETE /payment methods/', function () {
  beforeAll(async () => {
    await connection.create();
  });
  afterAll(async () => {
    await connection.close();
  });
  it('Should create a payment method with all input fields and return {payment method}.', function (done) {
    request(app)
      .post(createEndPoint)
      .set('Authorization', TOKEN)
      .send(paymentMethodClass.createRequest)
      .expect('Content-Type', /json/)
      .expect(PaymentMethod)
      .expect(201)
      .expect((res) => {
        commonEndPoint += res.body.payment_method_id;
        expect(res.body).toEqual(
          expect.objectContaining(paymentMethodClass.createResponse)
        );
      })
      .end(done);
  });

  it('Should list payment methods and return [{payment methods}].', function (done) {
    request(app)
      .get(listEndPoint)
      .set('Authorization', TOKEN)
      .query(paymentMethodClass.listRequest)
      .expect('Content-Type', /json/)
      .expect(PaymentMethod)
      .expect(200)
      .expect((res) => {
        if (res.body.length) {
          const firstElement = res.body[0];
          expect(firstElement).toHaveProperty('payment_method_id');
          expect(firstElement).toHaveProperty('name');
          expect(firstElement).toHaveProperty('is_active');
          expect(firstElement).toHaveProperty('created_at');
          expect(firstElement).toHaveProperty('updated_at');
        } else {
          expect(res.body).toEqual(expect.arrayContaining([]));
        }
      })
      .end(done);
  });
  it('Should get a payment method and return {payment methods}.', function (done) {
    request(app)
      .get(commonEndPoint)
      .set('Authorization', TOKEN)
      .expect('Content-Type', /json/)
      .expect(PaymentMethod)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining(paymentMethodClass.getResponse)
        );
      })
      .end(done);
  });
  it('Should update a payment metod and return {payment method}.', function (done) {
    request(app)
      .put(commonEndPoint)
      .set('Authorization', TOKEN)
      .send(paymentMethodClass.updateRequest)
      .expect('Content-Type', /json/)
      .expect(PaymentMethod)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining(paymentMethodClass.updateResponse)
        );
      })
      .end(done);
  });
  it('Should delete a payment method softly and return {payment method}.', function (done) {
    request(app)
      .delete(commonEndPoint)
      .set('Authorization', TOKEN)
      .expect('Content-Type', /json/)
      .expect(PaymentMethod)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining(paymentMethodClass.deleteResponse)
        );
      })
      .end(done);
  });
});
