import request from 'supertest';
import 'dotenv/config';

import { User } from '@modules/users/infra/typeorm/entities/User';
import faker from 'faker';

const API = process.env.TEST_URL;

const body = {
  user_name: faker.name.findName(),
  user_type: 'admin',
  user_phone: faker.phone.phoneNumber(),
  cpf: '100.000.000-00',
  password: 'minimum',
  email: faker.random.word()
};

describe('POST /users/register', function () {
  it('responds with json', function (done) {
    request(API)
      .post('/users/register')
      .send(body)
      .expect('Content-Type', /json/)
      .expect(User)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            name: body.user_name,
            type: body.user_type,
            phone: body.user_phone,
            cpf: body.cpf,
            email: body.email
          })
        );
      })
      .end(done);
  });
});
