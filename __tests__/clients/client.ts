import request from 'supertest';
import { Client } from '@modules/users/infra/typeorm/entities/Client';

const API = 'http://127.0.0.1:4000';

const body = {
  client_name: 'abgail',
  client_cpf: '10101010',
  client_phone: '7070707070',
  client_email: 'bilubilu@teteia.com'
};

describe('POST /clients/register', function () {
  it('responds with json', function (done) {
    request(API)
      .post('/clients/register')
      .send(body)
      .expect('Content-Type', /json/)
      .expect(Client)
      .expect(201, done);
  });
});
