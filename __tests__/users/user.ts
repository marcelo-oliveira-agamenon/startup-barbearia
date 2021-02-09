import request from 'supertest';
import { expressInstance } from '@shared/server';

describe('POST /users/register', function () {
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
      .expect(201, done);
  });
});
