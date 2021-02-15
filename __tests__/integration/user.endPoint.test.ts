import request from 'supertest';
import 'dotenv/config';

import { User } from '@modules/users/infra/typeorm/entities/User';
import faker from 'faker';

const API = `http://127.0.0.1:${process.env.PORT}`;

const body = {
  user_name: faker.name.findName(),
  user_type: 'admin',
  user_phone: faker.phone.phoneNumber(),
  cpf: '100.000.000-00',
  password: 'minimum',
  email: faker.random.word()
};

describe('POST /users/register', function () {
  beforeAll(async () => {
    connection = await createConnection(config);
  });

  it('responds with json', function (done) {
    request(API)
      .post('/users/register')
      .send(body)
      .expect('Content-Type', /json/)
      .expect(User)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('user_name', body.user_name);
        expect(res.body).toHaveProperty('user_type', body.user_type);
        expect(res.body).toHaveProperty('user_phone', body.user_phone);
        expect(res.body).toHaveProperty('cpf', body.cpf);
        expect(res.body).toHaveProperty('email', body.email);
      })
      .end(done);
  });
  afterAll(async () => {
    await connection.close();
  });
});
