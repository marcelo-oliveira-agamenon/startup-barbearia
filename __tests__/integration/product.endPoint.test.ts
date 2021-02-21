import request from 'supertest';
import 'dotenv/config';

import faker from 'faker';
import Product from '@modules/sales/infra/typeorm/entities/Product';


const API = process.env.TEST_URL;

const 
  name= faker.name.findName(),
  cost= faker.phone.phoneNumber(),
  price= faker.phone.phoneNumber(),
  description= faker.internet.email(),
  discount= faker.phone.phoneNumber()
;

const body = {
    name,
    cost,
    price,
    description,
    discount
  },
  commonResponse = {
    product_id: expect.anything(),
    name,
    cost,
    price: expect.anything(),
    description,
    discount,
    created_at: expect.anything(),
    updated_at: expect.anything(),
    deleted_at: null
  };

const createEndPoint = '/products/signup', listEndPoint = '/products/';
let commonEndPoint = '/products/';

describe('POST/GET/PUT/DELETE /products', function () {
    it('Should create a client with all input fields and return {client}.', function (done) {
        request(API)
          .post(createEndPoint)
          .send(body)
          .expect('Content-Type', /json/)
          .expect(Product)
          .expect((res) => {
            commonEndPoint += res.body.product_id;
            expect(res.body).toEqual(expect.objectContaining(commonResponse));
          })
          .end(done);
      });
});