import request from 'supertest';
import { Any } from 'typeorm';
import { User } from '@modules/users/infra/typeorm/entities/User';
const API = 'http://127.0.0.1:4000';

const body = {
  user_name: 'teste',
  user_type: 'admin',
  user_phone: '75986667171',
  password: '6165165651'
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
