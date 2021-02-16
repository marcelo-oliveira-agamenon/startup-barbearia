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
  createResponse = {
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
  };

const updateBody = {
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
  };
const deleteResponse = {
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
const createEndPoint = '/users/signup';
let endPoint = '/users/';

describe('POST /users/register', function () {
  it('Should create a user with all input fields and return {user}.', function (done) {
    request(API)
      .post(createEndPoint)
      .send(body)
      .expect('Content-Type', /json/)
      .expect(User)
      .expect(201)
      .expect((res) => {
        endPoint += res.body.user_id;
        expect(res.body).toEqual(expect.objectContaining(createResponse));
      })
      .end(done);
  });

  it('Should get a user and return {user}.', function (done) {
    request(API)
      .get(endPoint)
      .expect('Content-Type', /json/)
      .expect(User)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expect.objectContaining(createResponse));
      })
      .end(done);
  });
  it('Should update a user and return {user}.', function (done) {
    request(API)
      .put(endPoint)
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
      .delete(endPoint)
      .expect('Content-Type', /json/)
      .expect(User)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expect.objectContaining(deleteResponse));
      })
      .end(done);
  });
});
