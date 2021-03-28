import 'reflect-metadata';
import 'shared/container';
import 'dotenv/config';
import { container } from 'tsyringe';
import { Connection, createConnection } from 'typeorm';

import config from '@shared/infra/typeorm/ormconfig';
import request from 'supertest';

import SaleClass from './sale-class';
import ProductClass from './product-class';
import ServiceClass from './service-class';
import SaleItemsClass from './saleItems-class';

import { CreateSaleService } from '@modules/sales/services/sale/CreateSaleService';
import { CreateProductService } from '@modules/sales/services/product/CreateProductService';
import { CreateServiceService } from '@modules/sales/services/service/CreateServiceService';

import SaleItems from '@modules/sales/infra/typeorm/entities/SaleItems';

import app from '@shared/infra/config/app';
import { CreateUserService } from '@modules/users/services/user/CreateUserService';
import UserClass from '../users/user-class';

let connection: Connection;

const saleClass = new SaleClass();
const userClass = new UserClass();
const productClass = new ProductClass();
const serviceClass = new ServiceClass();
const saleItemsClass = new SaleItemsClass();

const TOKEN = `Bearer ${process.env.TOKEN}`;

const createEndPoint = '/sale-items/signup',
  listEndPoint = '/sale-items/';
let commonEndPoint = '/sale-items/';

describe('POST/GET/DELETE /sale-items/', function () {
  beforeAll(async () => {
    connection = await createConnection(config);

    const createProduct = container.resolve(CreateProductService);
    const createService = container.resolve(CreateServiceService);

    const product = await createProduct.execute(productClass);
    const service = await createService.execute(serviceClass);
    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute(userClass);
    if (user) {
      const createSale = container.resolve(CreateSaleService);
      saleClass.user_id = user.user_id;
      const sale = await createSale.execute(saleClass);
      if (sale) saleItemsClass.sale_id = sale.sale_id;
    }

    if (product) saleItemsClass.product_id = product.product_id;
    if (service) saleItemsClass.service_id = service.service_id;
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
      .query(saleClass.listRequest)
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

  // it('Should update a sale and return {sale}.', function (done) {
  //   request(app)
  //     .put(commonEndPoint)
  //     .set('Authorization', TOKEN)
  //     .send(saleClass.updateRequest)
  //     .expect('Content-Type', /json/)
  //     .expect(Sale)
  //     .expect(200)
  //     .expect((res) => {
  //       expect(res.body).toEqual(
  //         expect.objectContaining(saleClass.updateResponse)
  //       );
  //     })
  //     .end(done);
  // });

  // it('Should delete a sale softly and return {sale}.', function (done) {
  //   request(app)
  //     .delete(commonEndPoint)
  //     .set('Authorization', TOKEN)
  //     .expect('Content-Type', /json/)
  //     .expect(Sale)
  //     .expect(200)
  //     .expect((res) => {
  //       expect(res.body).toEqual(
  //         expect.objectContaining(saleClass.deleteResponse)
  //       );
  //     })
  //     .end(done);
  // });
});
