import request from 'supertest';
import 'reflect-metadata';
const API = 'http://127.0.0.1:4000';

describe('POST /users/register', function () {
  it('responds with json', function (done) {
    const body = {
      user_name: 'teste',
      user_type: 'admin',
      user_phone: '75986667171',
      password: '6165165651'
    };

    request(API)
      .post('/users/register')
      .send(body)
      .expect('Content-Type', /json/)
      .expect({ name: 'AuthenticationError', message: 'Unauthorized' })
      .expect(401, done);
  });
});
