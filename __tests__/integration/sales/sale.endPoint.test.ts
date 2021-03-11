import 'reflect-metadata';
import 'shared/container';
import 'dotenv/config';

import { container } from 'tsyringe';
import { Connection, createConnection } from 'typeorm';

import config from '@shared/infra/typeorm/ormconfig';
import request from 'supertest';

import SaleClass from './sale-class';
import UserClass from '../users/user-class';
import ClientClass from '../users/client-class';

import { CreateUserService } from '@modules/users/services/user';
import { CreateClientService } from '@modules/users/services/client';
import Sale from '@modules/sales/infra/typeorm/entities/Sale';

const saleClass = new SaleClass();
const userClass = new UserClass();
const clientClass = new ClientClass();

const API = process.env.TEST_URL;
const TOKEN = `Bearer ${process.env.TOKEN}`;
let connection: Connection;

const createEndPoint = '/sales/signup',
  listEndPoint = '/sales/',
  loginEndPoint = '/sales';
let commonEndPoint = '/sales/';

describe('POST/GET/DELETE /sales/', function () {
  beforeAll(async () => {
    connection = await createConnection(config);

    const createUser = container.resolve(CreateUserService);
    const createClient = container.resolve(CreateClientService);

    const user = await createUser.execute(userClass);
    const client = await createClient.execute(clientClass);

    if (user) saleClass.user_id = user.user_id;
    if (client) saleClass.client_id = client.client_id;
  });
  afterAll(async () => {
    await connection.close();
  });
  it('Should create a sale with all input fields and return {sale}.', function (done) {
    request(API)
      .post(createEndPoint)
      .set('Authorization', TOKEN)
      .send(saleClass.createRequest)
      .expect('Content-Type', /json/)
      .expect(Sale)
      .expect(201)
      .expect((res) => {
        commonEndPoint += res.body.sale_id;
        expect(res.body).toEqual(
          expect.objectContaining(saleClass.createResponse)
        );
      })
      .end(done);
  });
  it('Should get a sale and return {user}.', function (done) {
    request(API)
      .get(commonEndPoint)
      .set('Authorization', TOKEN)
      .expect('Content-Type', /json/)
      .expect(Sale)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining(saleClass.getResponse)
        );
      })
      .end(done);
  });

  it('Should list sales and return [{user}].', function (done) {
    request(API)
      .get(listEndPoint)
      .set('Authorization', TOKEN)
      .query(saleClass.listRequest)
      .expect('Content-Type', /json/)
      .expect(Sale)
      .expect(200)
      .expect((res) => {
        if (res.body.length) {
          const firstElement = res.body[0];
          expect(firstElement).toHaveProperty('client_id');
          expect(firstElement).toHaveProperty('user_id');
          expect(firstElement).toHaveProperty('value');
          expect(firstElement).toHaveProperty('discount');
          expect(firstElement).toHaveProperty('is_discount_fixed');
          expect(firstElement).toHaveProperty('sale_id');
          expect(firstElement).toHaveProperty('created_at');
          expect(firstElement).toHaveProperty('updated_at');
          expect(firstElement).toHaveProperty('deleted_at');
        } else {
          expect(res.body).toEqual(expect.arrayContaining([]));
        }
      })
      .end(done);
  });

  // it('Should update a user and return {user}.', function (done) {
  //   request(API)
  //     .put(commonEndPoint)
  //     .set('Authorization', TOKEN)
  //     .send(userClass.updateRequest)
  //     .expect('Content-Type', /json/)
  //     .expect(User)
  //     .expect(200)
  //     .expect((res) => {
  //       expect(res.body).toEqual(
  //         expect.objectContaining(userClass.updateResponse)
  //       );
  //     })
  //     .end(done);
  // });

  // it('Should delete a user softly and return {user}.', function (done) {
  //   request(API)
  //     .delete(commonEndPoint)
  //     .set('Authorization', TOKEN)
  //     .expect('Content-Type', /json/)
  //     .expect(User)
  //     .expect(200)
  //     .expect((res) => {
  //       expect(res.body).toEqual(
  //         expect.objectContaining(userClass.deleteResponse)
  //       );
  //     })
  //     .end(done);
  // });
});
