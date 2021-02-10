import request from 'supertest';
import { expressInstance } from '@shared/server';
import 'reflect-metadata';
import { Connection, getConnection, createConnection } from 'typeorm';
import config from '@shared/infra/typeorm/ormconfig';
let connection: Connection;

describe('POST /users/register', function () {
  beforeAll(async () => {
    connection = await createConnection(config);
  });

  it('responds with json', function (done) {
    const body = {
      user_name: 'teste',
      user_type: 'admin',
      user_phone: '75986667171',
      password: '6165165651'
    };

    request(expressInstance)
      .post('/users/register')
      .send(body)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201, done)
      .expect((res) => {
        expect(res.body).toHaveProperty('user_name', 'teste');
      });
  });
  afterAll(async () => {
    await connection.close();
  });
});
