import request from 'supertest';
import 'reflect-metadata';

const API = 'http://localhost:3000';

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
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(201);
        done();
      });
  });
});
