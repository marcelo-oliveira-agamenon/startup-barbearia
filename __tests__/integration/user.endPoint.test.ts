import request from 'supertest';
import 'dotenv/config';

import { User, UserRole } from '@modules/users/infra/typeorm/entities/User';

import faker from 'faker';

const API = process.env.TEST_URL;

const name = faker.name.findName(),
  user_type = UserRole.ADMIN,
  phone = faker.phone.phoneNumber(),
  cpf = faker.internet.password(14),
  password = faker.internet.password(6),
  confirmPassword = password,
  email = faker.internet.email(),
  is_active = faker.random.boolean();

const body = {
    name,
    user_type,
    phone,
    cpf,
    password,
    confirmPassword,
    email,
    is_active
  },
  commonResponse = {
    user_id: expect.anything(),
    name,
    user_type,
    phone,
    cpf,
    email,
    is_active,
    created_at: expect.anything(),
    updated_at: expect.anything(),
    deleted_at: null
  },
  listQuery = {
    limit: faker.random.number(),
    offset: 1
  },
  updateBody = {
    name,
    user_type,
    phone,
    cpf,
    password,
    confirmPassword,
    email,
    is_active: false
  },
  updateResponse = {
    user_id: expect.anything(),
    name,
    user_type,
    phone,
    cpf,
    email,
    is_active: false,
    created_at: expect.anything(),
    updated_at: expect.anything(),
    deleted_at: null
  },
  deleteResponse = {
    user_id: expect.anything(),
    name,
    user_type,
    phone,
    cpf,
    email,
    is_active: false,
    created_at: expect.anything(),
    updated_at: expect.anything(),
    deleted_at: expect.anything()
  };
const createEndPoint = '/users/signup',
  listEndPoint = '/users/';
let commonEndPoint = '/users/';

describe('POST/GET/PUT/DELETE /users/', function () {
  it('Should create a user with all input fields and return {user}.', function (done) {
    request(API)
      .post(createEndPoint)
      .send(body)
      .expect('Content-Type', /json/)
      .expect(User)
      .expect(201)
      .expect((res) => {
        commonEndPoint += res.body.user_id;
        expect(res.body).toEqual(expect.objectContaining(commonResponse));
      })
      .end(done);
  });

  it('Should list users and return [{user}].', function (done) {
    request(API)
      .get(listEndPoint)
      .query(listQuery)
      .expect('Content-Type', /json/)
      .expect(User)
      .expect(200)
      .expect((res) => {
        if (res.body.length) {
          const firstElement = res.body[0];
          expect(firstElement).toHaveProperty('user_id');
          expect(firstElement).toHaveProperty('name');
          expect(firstElement).toHaveProperty('user_type');
          expect(firstElement).toHaveProperty('phone');
          expect(firstElement).toHaveProperty('cpf');
          expect(firstElement).toHaveProperty('email');
          expect(firstElement).toHaveProperty('is_active');
          expect(firstElement).toHaveProperty('created_at');
          expect(firstElement).toHaveProperty('updated_at');
          expect(firstElement).toHaveProperty('deleted_at');
        } else {
          expect(res.body).toEqual(expect.arrayContaining([]));
        }
      })
      .end(done);
  });
  it('Should get a user and return {user}.', function (done) {
    request(API)
      .get(commonEndPoint)
      .expect('Content-Type', /json/)
      .expect(User)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expect.objectContaining(commonResponse));
      })
      .end(done);
  });
  it('Should update a user and return {user}.', function (done) {
    request(API)
      .put(commonEndPoint)
      .send(updateBody)
      .expect('Content-Type', /json/)
      .expect(User)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expect.objectContaining(updateResponse));
      })
      .end(done);
  });
  it('Should delete a user softly and return {user}.', function (done) {
    request(API)
      .delete(commonEndPoint)
      .expect('Content-Type', /json/)
      .expect(User)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expect.objectContaining(deleteResponse));
      })
      .end(done);
  });
});
