import 'reflect-metadata';
import 'shared/container';
import 'dotenv/config';

import request from 'supertest';
import app from '@shared/infra/config/app';
import connection from '../config/connection';

import SaleItems from '@modules/sales/infra/typeorm/entities/SaleItems';
import SaleItemsClass from '../factories/saleItems-class';
import { makeSaleItemsSut } from '../factories';

let saleItemsClass: SaleItemsClass;

const TOKEN = `Bearer ${process.env.TOKEN}`;

const createEndPoint = '/sale-items/signup',
  listEndPoint = '/sale-items/';
let commonEndPoint = '/sale-items/';

describe('POST/GET/DELETE /sale-items/', function () {
  beforeAll(async () => {
    await connection.create();
    saleItemsClass = await makeSaleItemsSut();
  });

  afterAll(async () => {
    await connection.close();
  });
  it('Should create a sale items with product and return {saleItems}.', function (done) {
    saleItemsClass.quantity = 10;
    request(app)
      .post(createEndPoint)
      .set('Authorization', TOKEN)
      .send(saleItemsClass.createRequestWithProduct)
      .expect('Content-Type', /json/)
      .expect(SaleItems)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining(saleItemsClass.createResponseWithProduct)
        );
      })
      .end(done);
  });
  it('Should create a sale items with service and return {saleItems}.', function (done) {
    request(app)
      .post(createEndPoint)
      .set('Authorization', TOKEN)
      .send(saleItemsClass.createRequestWithService)
      .expect('Content-Type', /json/)
      .expect(SaleItems)
      .expect(201)
      .expect((res) => {
        commonEndPoint += res.body.sale_items_id;
        expect(res.body).toEqual(
          expect.objectContaining(saleItemsClass.createResponseWithService)
        );
      })
      .end(done);
  });
  it('Should get a sale items and return {saleItems}.', function (done) {
    request(app)
      .get(commonEndPoint)
      .set('Authorization', TOKEN)
      .expect('Content-Type', /json/)
      .expect(SaleItems)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining(saleItemsClass.getResponse)
        );
      })
      .end(done);
  });

  it('Should list sales items and return [{sale items}].', function (done) {
    request(app)
      .get(listEndPoint)
      .set('Authorization', TOKEN)
      .query(saleItemsClass.listRequest)
      .expect('Content-Type', /json/)
      .expect(SaleItems)
      .expect(200)
      .expect((res) => {
        if (res.body.length) {
          const firstElement = res.body[0];
          expect(firstElement).toHaveProperty('sale_id');
          expect(firstElement).toHaveProperty('product_id');
          expect(firstElement).toHaveProperty('service_id');
          expect(firstElement).toHaveProperty('quantity');
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

  it('Should update a sale items and return {saleItems}.', function (done) {
    request(app)
      .put(commonEndPoint)
      .set('Authorization', TOKEN)
      .send(saleItemsClass.updateRequest)
      .expect('Content-Type', /json/)
      .expect(SaleItems)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining(saleItemsClass.updateResponse)
        );
      })
      .end(done);
  });

  it('Should delete a sale items softly and return {saleItems}.', function (done) {
    request(app)
      .delete(commonEndPoint)
      .set('Authorization', TOKEN)
      .expect('Content-Type', /json/)
      .expect(SaleItems)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining(saleItemsClass.deleteResponse)
        );
      })
      .end(done);
  });
});
