import request from 'supertest';
import { User } from '@modules/users/infra/typeorm/entities/User';
import faker from 'faker';

const API = 'http://127.0.0.1:4000';

const body = {
  user_name: faker.name.findName(),
  user_type: 'admin',
  user_phone: faker.phone.phoneNumber(),
  password: faker.name.findName()
};

describe('POST /users/register', function () {
  it('responds with json', function (done) {
    request(API)
      .post('/users/register')
      .send(body)
      .expect('Content-Type', /json/)
      .expect(User)
      .expect(201, done);
  });
});
