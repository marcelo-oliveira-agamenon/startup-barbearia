import request from 'supertest';
import 'dotenv/config';

import { User, UserRole } from '@modules/users/infra/typeorm/entities/User';

import faker from 'faker';

const API = process.env.TEST_URL;

const name = faker.name.findName(),
  user_type = UserRole.ADMIN,
  phone = faker.phone.phoneNumber(),
  cpf = '100.000.000-00',
  password = 'minimum',
  email = faker.random.word(),
  is_active = faker.random.boolean();

const body = { name, user_type, phone, cpf, password, email, is_active };
const requiredBody = { name, user_type: UserRole.NORMAL, password, email };

describe('POST /users/register', function () {
  it('Should send all fields and return {user}.', function (done) {
    request(API)
      .post('/users/register')
      .send(body)
      .expect('Content-Type', /json/)
      .expect(User)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            name,
            user_type,
            phone,
            cpf,
            email,
            is_active,
            deleted_at: null
          })
        );
      })
      .end(done);
  });

  it('Should send only the required fields and return {user}. ', function (done) {
    request(API)
      .post('/users/register')
      .send(requiredBody)
      .expect('Content-Type', /json/)
      .expect(User)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            name,
            user_type: UserRole.NORMAL,
            phone: null,
            cpf: null,
            email,
            is_active: true,
            deleted_at: null
          })
        );
      })
      .end(done);
  });
});
