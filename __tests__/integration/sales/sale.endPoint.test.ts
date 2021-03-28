import 'reflect-metadata';
import 'dotenv/config';
import connection from '../config/connection';
import request from 'supertest';
import Sale from '@modules/sales/infra/typeorm/entities/Sale';
import app from '@shared/infra/config/app';
import SaleClass from '../factories/sale-class';
import { makeSaleSut } from '../factories';

const TOKEN = `Bearer ${process.env.TOKEN}`;

const createEndPoint = '/sales/signup',
  listEndPoint = '/sales/';
let commonEndPoint = '/sales/';

let saleClass: SaleClass;

describe('POST/GET/DELETE /sales/', function () {
  beforeAll(async () => {
    await connection.create();
    saleClass = await makeSaleSut();
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Should create a sale with all input fields and return {sale}.', function (done) {
    request(app)
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
  it('Should get a sale and return {sale}.', function (done) {
    request(app)
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

  it('Should list sales and return [{sale}].', function (done) {
    request(app)
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

  it('Should update a sale and return {sale}.', function (done) {
    request(app)
      .put(commonEndPoint)
      .set('Authorization', TOKEN)
      .send(saleClass.updateRequest)
      .expect('Content-Type', /json/)
      .expect(Sale)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining(saleClass.updateResponse)
        );
      })
      .end(done);
  });

  it('Should delete a sale softly and return {sale}.', function (done) {
    request(app)
      .delete(commonEndPoint)
      .set('Authorization', TOKEN)
      .expect('Content-Type', /json/)
      .expect(Sale)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining(saleClass.deleteResponse)
        );
      })
      .end(done);
  });
});
