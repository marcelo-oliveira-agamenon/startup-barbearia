import request from 'supertest';
import { Client } from '@modules/users/infra/typeorm/entities/Client';

import faker from 'faker';


const API = 'http://127.0.0.1:4000';

const 
  name= faker.name.findName(),
  cpf= faker.internet.password(12),
  phone= faker.phone.phoneNumber(),
  email= faker.internet.email()
;

const body = {
  name,
  phone,
  cpf,
  email,
},
commonResponse = {
  client_id: expect.anything(),
  name,
  phone,
  cpf,
  email,
  created_at: expect.anything(),
  updated_at: expect.anything(),
  deleted_at: null
};


describe('POST /clients/signup', function () {
  it('responds with json', function (done) {
    request(API)
      .post('/clients/signup')
      .send(body)
      .expect('Content-Type', /json/)
      .expect(Client)
      .expect((res) => {
        expect(res.body).toEqual(expect.objectContaining(commonResponse));
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