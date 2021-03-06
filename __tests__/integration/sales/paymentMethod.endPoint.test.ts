import request from 'supertest';
import 'dotenv/config';

import PaymentMethod from '@modules/sales/infra/typeorm/entities/PaymentMethod';

import faker from 'faker';

const API = process.env.TEST_URL;

const name = faker.name.findName(),
  is_active = faker.random.boolean();

const body = {
    name,
    is_active
  },
  bodyResponse = {
    payment_method_id: expect.anything(),
    name,
    is_active,
    created_at: expect.anything(),
    updated_at: expect.anything()
  },
  getResponse = {
    payment_method_id: expect.anything(),
    name,
    is_active,
    created_at: expect.anything(),
    updated_at: expect.anything()
  },
  listQuery = {
    limit: faker.random.number(),
    offset: 1
  },
  updateBody = {
    name,
    is_active: false
  },
  updateResponse = {
    payment_method_id: expect.anything(),
    name,
    is_active: false,
    created_at: expect.anything(),
    updated_at: expect.anything()
  },
  deleteResponse = {
    payment_method_id: expect.anything(),
    name,
    is_active: false,
    created_at: expect.anything(),
    updated_at: expect.anything()
  };
const createEndPoint = '/payment-methods/signup',
  listEndPoint = '/payment-methods/';
let commonEndPoint = '/payment-methods/';

describe('POST/GET/PUT/DELETE /users/', function () {
  it('Should create a payment method with all input fields and return {user}.', function (done) {
    request(API)
      .post(createEndPoint)
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .send(body)
      .expect('Content-Type', /json/)
      .expect(PaymentMethod)
      .expect(201)
      .expect((res) => {
        commonEndPoint += res.body.payment_method_id;
        expect(res.body).toEqual(expect.objectContaining(bodyResponse));
      })
      .end(done);
  });

  it('Should list payment methods and return [{payment methods}].', function (done) {
    request(API)
      .get(listEndPoint)
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .query(listQuery)
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
  it('Should get a payment method and return {user}.', function (done) {
    request(API)
      .get(commonEndPoint)
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .expect('Content-Type', /json/)
      .expect(PaymentMethod)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expect.objectContaining(getResponse));
      })
      .end(done);
  });
  it('Should update a payment metod and return {payment metod}.', function (done) {
    request(API)
      .put(commonEndPoint)
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .send(updateBody)
      .expect('Content-Type', /json/)
      .expect(PaymentMethod)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expect.objectContaining(updateResponse));
      })
      .end(done);
  });
  it('Should delete a payment method softly and return {payment method}.', function (done) {
    request(API)
      .delete(commonEndPoint)
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .expect('Content-Type', /json/)
      .expect(PaymentMethod)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expect.objectContaining(deleteResponse));
      })
      .end(done);
  });
});