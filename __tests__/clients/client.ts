import request from 'supertest';
import { Client } from '@modules/users/infra/typeorm/entities/Client';

const API = 'http://127.0.0.1:4000';

const body = {
  client_name: 'abgail',
  client_cpf: '101010',
  client_phone: '70707070',
  client_mail: 'bilubilu@teteia.com'
};

describe('POST /clients/register', function () {
  it('responds with json', function (done) {
    request(API)
      .post('/clients/register')
      .send(body)
      .expect('Content-Type', /json/)
      .expect(Client)
      .expect((res) => {
        expect(res.body).toHaveProperty('client_name', body.client_name);
        expect(res.body).toHaveProperty('client_cpf', body.client_cpf);
        expect(res.body).toHaveProperty('client_phone', body.client_phone);
        expect(res.body).toHaveProperty('client_mail', body.client_mail);
      })
      .end(done);
  });
});

// describe('POST /clients/delete', function () {
//   it('responds with json', function (done) {
//     request(API)
//       .post('/clients/delete')
//       .send(body)
//       .expect('Content-Type', /json/)
//       .expect(Client)
//       .expect((res) => {
//         expect(res.body).toHaveProperty('client_name', body.client_name);
//         expect(res.body).toHaveProperty('client_cpf', body.client_cpf);
//         expect(res.body).toHaveProperty('client_phone', body.client_phone);
//         expect(res.body).toHaveProperty('client_email', body.client_email);
//       })
//       .end(done);
//   });
// });