import request from 'supertest';
import 'dotenv/config';

import PaymentMethod from '@modules/sales/infra/typeorm/entities/PaymentMethod';

import faker from 'faker';

const API = process.env.TEST_URL;

const name = faker.name.findName(),
  is_active = faker.random.boolean();

const body = {
    name
  },
  commonResponse = {
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
    user_id: expect.anything(),
    name,

    is_active: false,
    created_at: expect.anything(),
    updated_at: expect.anything(),
    deleted_at: null
  },
  deleteResponse = {
    user_id: expect.anything(),
    name,

    is_active: false,
    created_at: expect.anything(),
    updated_at: expect.anything(),
    deleted_at: expect.anything()
  };
const createEndPoint = '/payment-methods/signup',
  listEndPoint = '/payment-methods/',
  loginEndPoint = '/payment-methods';
let commonEndPoint = '/payment-methods/';

describe('POST/GET/PUT/DELETE /users/', function () {
  it('Should create a user with all input fields and return {user}.', function (done) {
    request(API)
      .post(createEndPoint)
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .send(body)
      .expect('Content-Type', /json/)
      .expect(PaymentMethod)
      .expect(201)
      .expect((res) => {
        commonEndPoint += res.body.user_id;
        expect(res.body).toEqual(expect.objectContaining(commonResponse));
      })
      .end(done);
  });

  // it('Should list users and return [{user}].', function (done) {
  //   request(API)
  //     .get(listEndPoint)
  //     .set('Authorization', `Bearer ${process.env.TOKEN}`)
  //     .query(listQuery)
  //     .expect('Content-Type', /json/)
  //     .expect(User)
  //     .expect(200)
  //     .expect((res) => {
  //       if (res.body.length) {
  //         const firstElement = res.body[0];
  //         expect(firstElement).toHaveProperty('user_id');
  //         expect(firstElement).toHaveProperty('name');
  //         expect(firstElement).toHaveProperty('user_type');
  //         expect(firstElement).toHaveProperty('phone');
  //         expect(firstElement).toHaveProperty('cpf');
  //         expect(firstElement).toHaveProperty('email');
  //         expect(firstElement).toHaveProperty('is_active');
  //         expect(firstElement).toHaveProperty('created_at');
  //         expect(firstElement).toHaveProperty('updated_at');
  //         expect(firstElement).toHaveProperty('deleted_at');
  //       } else {
  //         expect(res.body).toEqual(expect.arrayContaining([]));
  //       }
  //     })
  //     .end(done);
  // });
  // it('Should get a user and return {user}.', function (done) {
  //   request(API)
  //     .get(commonEndPoint)
  //     .set('Authorization', `Bearer ${process.env.TOKEN}`)
  //     .expect('Content-Type', /json/)
  //     .expect(User)
  //     .expect(200)
  //     .expect((res) => {
  //       expect(res.body).toEqual(expect.objectContaining(commonResponse));
  //     })
  //     .end(done);
  // });
  // it('Should update a user and return {user}.', function (done) {
  //   request(API)
  //     .put(commonEndPoint)
  //     .set('Authorization', `Bearer ${process.env.TOKEN}`)
  //     .send(updateBody)
  //     .expect('Content-Type', /json/)
  //     .expect(User)
  //     .expect(200)
  //     .expect((res) => {
  //       expect(res.body).toEqual(expect.objectContaining(updateResponse));
  //     })
  //     .end(done);
  // });
  // it('Should login and return {auth, token}.', function (done) {
  //   request(API)
  //     .post(loginEndPoint)
  //     .set('Authorization', `Bearer ${process.env.TOKEN}`)
  //     .send(loginBody)
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .expect((res) => {
  //       expect(res.body).toHaveProperty('auth');
  //       expect(res.body).toHaveProperty('token');
  //     })
  //     .end(done);
  // });
  // it('Should delete a user softly and return {user}.', function (done) {
  //   request(API)
  //     .delete(commonEndPoint)
  //     .set('Authorization', `Bearer ${process.env.TOKEN}`)
  //     .expect('Content-Type', /json/)
  //     .expect(User)
  //     .expect(200)
  //     .expect((res) => {
  //       expect(res.body).toEqual(expect.objectContaining(deleteResponse));
  //     })
  //     .end(done);
  // });
});
