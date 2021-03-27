import 'reflect-metadata';
import 'shared/container';
import 'dotenv/config';

import config from '@shared/infra/typeorm/ormconfig';
import request from 'supertest';

import { container } from 'tsyringe';
import { Connection, createConnection } from 'typeorm';

import ProductClass from './product-class';
import { CreateProductService } from '@modules/sales/services/product';
import StockClass from './stock-class';
import Stock from '@modules/sales/infra/typeorm/entities/Stock';
import app from '@shared/infra/config/app';

const TOKEN = `Bearer ${process.env.TOKEN}`;
let connection: Connection;

const createEndPoint = '/stocks/signup',
  listEndPoint = '/stocks/';
let commonEndPoint = '/stocks/';
let updateEndPoint = '/stocks/';

const productClass = new ProductClass();
const stockClass = new StockClass();

describe('POST/GET/DELETE /stocks/', function () {
  beforeAll(async () => {
    connection = await createConnection(config);

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute(productClass);
    if (product) stockClass.product_id = product.product_id;
  });
  afterAll(async () => {
    await connection.close();
  });

  it('Should create a stock with all input fields and return {stock}.', function (done) {
    request(app)
      .post(createEndPoint)
      .set('Authorization', TOKEN)
      .send(stockClass.createRequest)
      .expect('Content-Type', /json/)
      .expect(Stock)
      .expect(201)
      .expect((res) => {
        updateEndPoint += res.body.stock_id;
        commonEndPoint += res.body.product_id;
        expect(res.body).toEqual(
          expect.objectContaining(stockClass.createResponse)
        );
      })
      .end(done);
  });

  it('Should get a stock and return {stock}.', function (done) {
    request(app)
      .get(commonEndPoint)
      .set('Authorization', TOKEN)
      .expect('Content-Type', /json/)
      .expect(Stock)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining(stockClass.getResponse)
        );
      })
      .end(done);
  });

  it('Should list stocks and return [{stock}].', function (done) {
    request(app)
      .get(listEndPoint)
      .set('Authorization', TOKEN)
      .query(stockClass.listRequest)
      .expect('Content-Type', /json/)
      .expect(Stock)
      .expect(200)
      .expect((res) => {
        if (res.body.length) {
          const firstElement = res.body[0];
          expect(firstElement).toHaveProperty('product_id');
          expect(firstElement).toHaveProperty('stock_id');
          expect(firstElement).toHaveProperty('quantity');
          expect(firstElement).toHaveProperty('created_at');
        } else {
          expect(res.body).toEqual(expect.arrayContaining([]));
        }
      })
      .end(done);
  });

  it('Should update a stock and return {stock}.', function (done) {
    request(app)
      .put(updateEndPoint)
      .set('Authorization', TOKEN)
      .send(stockClass.updateRequest)
      .expect('Content-Type', /json/)
      .expect(Stock)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining(stockClass.updateResponse)
        );
      })
      .end(done);
  });

  it('Should delete a stock and return {stock}.', function (done) {
    request(app)
      .delete(updateEndPoint)
      .set('Authorization', TOKEN)
      .expect('Content-Type', /json/)
      .expect(Stock)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining(stockClass.deleteResponse)
        );
      })
      .end(done);
  });
});
