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
  createdResponse = {
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
const requiredBody = {
    name,
    user_type: UserRole.NORMAL,
    password,
    confirmPassword,
    email: faker.internet.email()
  },
  requiredCreatedResponse = {
    user_id: expect.anything(),
    name,
    user_type: UserRole.NORMAL,
    phone: null,
    cpf: null,
    email: requiredBody.email,
    is_active: true,
    created_at: expect.anything(),
    updated_at: expect.anything(),
    deleted_at: null
  };
const updatedBody = {
    name,
    user_type,
    phone,
    cpf,
    password,
    confirmPassword,
    email,
    is_active: false
  },
  updatedResponse = {
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
const deletedResponse = {
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
let deleteOrUpdateEndPoint = '/users/';

describe('POST /users/register', function () {
  it('Should create a user with all input fields and return {user}.', function (done) {
    request(API)
      .post(createEndPoint)
      .send(body)
      .expect('Content-Type', /json/)
      .expect(User)
      .expect(201)
      .expect((res) => {
        deleteOrUpdateEndPoint = deleteOrUpdateEndPoint + res.body.user_id;
        expect(res.body).toEqual(expect.objectContaining(createdResponse));
      })
      .end(done);
  });

  it('Should created a user with only the required input fields and return {user}. ', function (done) {
    request(API)
      .post(createEndPoint)
      .send(requiredBody)
      .expect('Content-Type', /json/)
      .expect(User)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining(requiredCreatedResponse)
        );
      })
      .end(done);
  });
  it('Should update a user and return {user}.', function (done) {
    request(API)
      .put(deleteOrUpdateEndPoint)
      .send(updatedBody)
      .expect('Content-Type', /json/)
      .expect(User)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expect.objectContaining(updatedResponse));
      })
      .end(done);
  });
  it('Should delete a user softly and return {user}.', function (done) {
    request(API)
      .delete(deleteOrUpdateEndPoint)
      .expect('Content-Type', /json/)
      .expect(User)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expect.objectContaining(deletedResponse));
      })
      .end(done);
  });
});
