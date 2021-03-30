import { app, connection, request } from '../config';

import Service from '@modules/sales/infra/typeorm/entities/Service';
import { makeServiceSut } from '../factories';
const serviceClass = makeServiceSut();

const createEndPoint = '/services/signup',
  listEndPoint = '/services/';
let commonEndPoint = '/services/';

describe('POST/GET/PUT/DELETE /service/', function () {
  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Should create a service with all input fields and return {service}.', function (done) {
    request(app)
      .post(createEndPoint)
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .send(serviceClass.createRequest)
      .expect('Content-Type', /json/)
      .expect(Service)
      .expect(201)
      .expect((res) => {
        commonEndPoint += res.body.service_id;
        expect(res.body).toEqual(
          expect.objectContaining(serviceClass.createResponse)
        );
      })
      .end(done);
  });

  it('Should list services and return [{service}].', function (done) {
    request(app)
      .get(listEndPoint)
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .query(serviceClass.getListSet)
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
        expect(res.body).toEqual(
          expect.objectContaining(serviceClass.getResponse)
        );
      })
      .end(done);
  });

  it('Should list services and return [{service}] with users.', function (done) {
    request(app)
      .get(listEndPoint + '/list/users')
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .query(serviceClass.getListSet)
      .expect('Content-Type', /json/)
      .expect(Service)
      .expect(200)
      .expect((res) => {
        if (res.body.length) {
          const firstElement = res.body[0];
          expect(firstElement).toHaveProperty('service_id');
          expect(firstElement).toHaveProperty('name');
          expect(firstElement).toHaveProperty('value');
          expect(firstElement).toHaveProperty('users');
          expect(firstElement).toHaveProperty('created_at');
          expect(firstElement).toHaveProperty('updated_at');
          expect(firstElement).toHaveProperty('deleted_at');
        } else {
          expect(res.body).toEqual(expect.arrayContaining([]));
        }
      })
      .end(done);
  });

  it('Should update a service and return {service}.', function (done) {
    request(app)
      .put(commonEndPoint)
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .send(serviceClass.updateRequest)
      .expect('Content-Type', /json/)
      .expect(Service)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining(serviceClass.updateResponse)
        );
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
        expect(res.body).toEqual(
          expect.objectContaining(serviceClass.deleteResponse)
        );
      })
      .end(done);
  });
});
