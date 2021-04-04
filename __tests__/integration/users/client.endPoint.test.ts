import { app, connection, request } from '../../config';

import Client from '@modules/users/infra/typeorm/entities/Client';
import { makeClientSut } from '../factories';
const clientClass = makeClientSut();

const TOKEN = `Bearer ${process.env.TOKEN}`;

const createEndPoint = '/clients/signup',
  listEndPoint = '/clients/';
let commonEndPoint = '/clients/';

describe('POST/GET/PUT/DELETE /clients/signup', function () {
  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.close();
  });
  it('Should create a client with all input fields and return {client}.', function (done) {
    request(app)
      .post(createEndPoint)
      .set('Authorization', TOKEN)
      .send(clientClass.createRequest)
      .expect('Content-Type', /json/)
      .expect(Client)
      .expect((res) => {
        commonEndPoint += res.body.client_id;
        expect(res.body).toEqual(
          expect.objectContaining(clientClass.createResponse)
        );
      })
      .end(done);
  });

  it('Should list clients and return [{client}].', function (done) {
    request(app)
      .get(listEndPoint)
      .set('Authorization', TOKEN)
      .query(clientClass.listRequest)
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
    request(app)
      .get(commonEndPoint)
      .set('Authorization', TOKEN)
      .expect('Content-Type', /json/)
      .expect(Client)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining(clientClass.getResponse)
        );
      })
      .end(done);
  });

  it('Should update a client and return {client}.', function (done) {
    request(app)
      .put(commonEndPoint)
      .set('Authorization', TOKEN)
      .send(clientClass.updateRequest)
      .expect('Content-Type', /json/)
      .expect(Client)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining(clientClass.updateResponse)
        );
      })
      .end(done);
  });

  it('Should delete a client softly and return {client}.', function (done) {
    request(app)
      .delete(commonEndPoint)
      .set('Authorization', TOKEN)
      .expect('Content-Type', /json/)
      .expect(Client)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining(clientClass.deleteResponse)
        );
      })
      .end(done);
  });
});
