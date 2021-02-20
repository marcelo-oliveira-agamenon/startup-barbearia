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
},
listQuery = {
  limit: faker.random.number(),
  offset: 1
};
const createEndPoint = '/clients/signup', listEndPoint = '/clients/';
let commonEndPoint = '/clients/';




describe('POST/GET/PUT/DELETE /clients/signup', function () {
  it('Should create a client with all input fields and return {client}.', function (done) {
    request(API)
      .post(createEndPoint)
      .send(body)
      .expect('Content-Type', /json/)
      .expect(Client)
      .expect((res) => {
        commonEndPoint += res.body.client_id;
        expect(res.body).toEqual(expect.objectContaining(commonResponse));
      })
      .end(done);
  });

  it('Should list clientes and return [{client}].', function (done) {
    request(API)
      .get(listEndPoint)
      .query(listQuery)
      .expect('Content-Type', /json/)
      .expect(Client)
      .expect(200)
      .expect((res) => {
        if (res.body.length) {
          const firstElement = res.body[0];
          expect(firstElement).toHaveProperty('client_id');
          expect(firstElement).toHaveProperty('name');
          expect(firstElement).toHaveProperty('phone');
          expect(firstElement).toHaveProperty('cpf');
          expect(firstElement).toHaveProperty('email');
          expect(firstElement).toHaveProperty('created_at');
          expect(firstElement).toHaveProperty('updated_at');
          expect(firstElement).toHaveProperty('deleted_at');
        } else {
          expect(res.body).toEqual(expect.arrayContaining([]));
        }
      })
      .end(done);
  });
  
  it('Should get a client and return {client}.', function (done) {
    request(API)
      .get(commonEndPoint)
      .send(body)
      .expect('Content-Type', /json/)
      .expect(Client)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expect.objectContaining(commonResponse));
      })
      .end(done);
  });

});