import request from 'supertest';
import 'dotenv/config';

import faker from 'faker';
import Product from '@modules/sales/infra/typeorm/entities/Product';


const API = process.env.TEST_URL;

const 
  name= faker.name.findName(),
  cost= faker.random.number(),
  value= faker.random.number(),
  description= faker.internet.email(),
  discount= faker.random.number()
;

const body = {
    name,
    cost,
    value,
    description,
    discount
  },
  commonResponse = {
    product_id: expect.anything(),
    name,
    cost,
    value: expect.anything(),
    description,
    discount,
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
    cost,
    value,
    description,
    discount
  },
  updateResponse = {
    product_id: expect.anything(),
    name,
    cost,
    value: expect.anything(),
    description,
    discount,
    created_at: expect.anything(),
    updated_at: expect.anything(),
    deleted_at: null
  },
  deleteResponse = {
    product_id: expect.anything(),
    name,
    cost,
    value,
    description,
    discount,
    created_at: expect.anything(),
    updated_at: expect.anything(),
    deleted_at: expect.anything()
  };

const createEndPoint = '/products/signup', listEndPoint = '/products/';
let commonEndPoint = '/products/';

describe('POST/GET/PUT/DELETE /products', function () {
    it('Should create a client with all input fields and return {client}.', function (done) {
        request(API)
          .post(createEndPoint)
          .set('Authorization', `Bearer ${process.env.TOKEN}`)
          .send(body)
          .expect('Content-Type', /json/)
          .expect(Product)
          .expect((res) => {
            commonEndPoint += res.body.product_id;
            expect(res.body).toEqual(expect.objectContaining(commonResponse));
          })
          .end(done);
      });

      it('Should list products and return [{product}].', function (done) {
        request(API)
          .get(listEndPoint)
          .set('Authorization', `Bearer ${process.env.TOKEN}`)
          .query(listQuery)
          .expect('Content-Type', /json/)
          .expect(Product)
          .expect(200)
          .expect((res) => {
            if (res.body.length) {
              const firstElement = res.body[0];
              expect(firstElement).toHaveProperty('product_id');
              expect(firstElement).toHaveProperty('name');
              expect(firstElement).toHaveProperty('cost');
              expect(firstElement).toHaveProperty('value');
              expect(firstElement).toHaveProperty('description');
              expect(firstElement).toHaveProperty('discount');
              expect(firstElement).toHaveProperty('created_at');
              expect(firstElement).toHaveProperty('updated_at');
              expect(firstElement).toHaveProperty('deleted_at');
            } else {
              expect(res.body).toEqual(expect.arrayContaining([]));
            }
          })
          .end(done);
      });

      it('Should get a product and return {product}.', function (done) {
        request(API)
          .get(commonEndPoint)
          .set('Authorization', `Bearer ${process.env.TOKEN}`)
          .send(body)
          .expect('Content-Type', /json/)
          .expect(Product)
          .expect(200)
          .expect((res) => {
            expect(res.body).toEqual(expect.objectContaining(commonResponse));
          })
          .end(done);
      });

      it('Should update a product and return {product}.', function (done) {
        request(API)
          .put(commonEndPoint)
          .set('Authorization', `Bearer ${process.env.TOKEN}`)
          .send(updateBody)
          .expect('Content-Type', /json/)
          .expect(Product)
          .expect(200)
          .expect((res) => {
            expect(res.body).toEqual(expect.objectContaining(updateResponse));
          })
          .end(done);
      });

      it('Should delete a client softly and return {client}.', function (done) {
        request(API)
          .delete(commonEndPoint)
          .set('Authorization', `Bearer ${process.env.TOKEN}`)
          .expect('Content-Type', /json/)
          .expect(Product)
          .expect(200)
          .expect((res) => {
            expect(res.body).toEqual(expect.objectContaining(deleteResponse));
          })
          .end(done);
      });
});