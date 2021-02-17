import request from 'supertest';
import 'reflect-metadata';
const API = 'http://127.0.0.1:4000';

describe('POST /services/create', function () {
  it('responds with json', function (done) {
    const body = {
      name: 'teste',
      value: 55
    };

    request(API)
      .post('/services/create')
      .send(body)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toHaveProperty('name', body.name);
        expect(res.body).toHaveProperty('value', body.value);
      })
      .expect(201, done);
  });
});
