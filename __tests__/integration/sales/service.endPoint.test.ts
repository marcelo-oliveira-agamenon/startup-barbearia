import request from 'supertest';
import 'dotenv/config';

import Service from '@modules/sales/infra/typeorm/entities/Service';

import faker from 'faker';

import app from '@shared/infra/config/app';
import { Connection, createConnection } from 'typeorm';
import config from '@shared/infra/typeorm/ormconfig';

let connection: Connection;

const name = faker.name.findName(),
  value = faker.random.number();

const body = {
    name,
    value
  },
  commonResponse = {
    service_id: expect.anything(),
    name,
    value: expect.anything(),
    created_at: expect.anything(),
    updated_at: expect.anything(),
    deleted_at: null
  },
  listQuery = {
    limit: faker.random.number(),
    offset: 1
  },
  updateBody = {
    name,
    value
  },
  updateResponse = {
    service_id: expect.anything(),
    name,
    value: expect.anything(),
    created_at: expect.anything(),
    updated_at: expect.anything(),
    deleted_at: null
  },
  deleteResponse = {
    service_id: expect.anything(),
    name,
    value: expect.anything(),
    created_at: expect.anything(),
    updated_at: expect.anything(),
    deleted_at: expect.anything()
  };
const createEndPoint = '/services/signup',
  listEndPoint = '/services/';
let commonEndPoint = '/services/';

describe('POST/GET/PUT/DELETE /service/', function () {
  beforeAll(async () => {
    connection = await createConnection(config);
  });
  afterAll(async () => {
    await connection.close();
  });
  it('Should create a service with all input fields and return {service}.', function (done) {
    request(app)
      .post(createEndPoint)
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .send(body)
      .expect('Content-Type', /json/)
      .expect(Service)
      .expect(201)
      .expect((res) => {
        commonEndPoint += res.body.service_id;
        expect(res.body).toEqual(expect.objectContaining(commonResponse));
      })
      .end(done);
  });

  it('Should list services and return [{service}].', function (done) {
    request(app)
      .get(listEndPoint)
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .query(listQuery)
      .expect('Content-Type', /json/)
      .expect(Service)
      .expect(200)
      .expect((res) => {
        if (res.body.length) {
          const firstElement = res.body[0];
          expect(firstElement).toHaveProperty('service_id');
          expect(firstElement).toHaveProperty('name');
          expect(firstElement).toHaveProperty('value');
          expect(firstElement).toHaveProperty('created_at');
          expect(firstElement).toHaveProperty('updated_at');
          expect(firstElement).toHaveProperty('deleted_at');
        } else {
          expect(res.body).toEqual(expect.arrayContaining([]));
        }
      })
      .end(done);
  });

  it('Should get a service and return {service}.', function (done) {
    request(app)
      .get(commonEndPoint)
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .expect('Content-Type', /json/)
      .expect(Service)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expect.objectContaining(commonResponse));
      })
      .end(done);
  });

  it('Should update a service and return {service}.', function (done) {
    request(app)
      .put(commonEndPoint)
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .send(updateBody)
      .expect('Content-Type', /json/)
      .expect(Service)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expect.objectContaining(updateResponse));
      })
      .end(done);
  });

  it('Should delete a service softly and return {service}.', function (done) {
    request(app)
      .delete(commonEndPoint)
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .expect('Content-Type', /json/)
      .expect(Service)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expect.objectContaining(deleteResponse));
      })
      .end(done);
  });
});
