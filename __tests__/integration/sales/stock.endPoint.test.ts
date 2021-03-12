import 'reflect-metadata';
import 'shared/container';
import 'dotenv/config';

import config from '@shared/infra/typeorm/ormconfig';
import request from 'supertest';

import { container } from 'tsyringe';
import { Connection, createConnection } from 'typeorm';

import ProductClass from "./product-class";
import { CreateProductService } from '@modules/sales/services/product';
import StockClass from './stock-class';
import Stock from '@modules/sales/infra/typeorm/entities/Stock';

const API = process.env.TEST_URL;
const TOKEN = `Bearer ${process.env.TOKEN}`;
let connection: Connection;

const createEndPoint = '/stocks/signup',
  listEndPoint = '/sales/',
  loginEndPoint = '/sales';
let commonEndPoint = '/stocks/';


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
        request(API)
          .post(createEndPoint)
          .set('Authorization', TOKEN)
          .send(stockClass.createRequest)
          .expect('Content-Type', /json/)
          .expect(Stock)
          .expect(201)
          .expect((res) => {
            commonEndPoint += res.body.stock_id;
            expect(res.body).toEqual(
              expect.objectContaining(stockClass.createResponse)
            );
          })
          .end(done);
      });
});