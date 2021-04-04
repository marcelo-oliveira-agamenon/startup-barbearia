import { app, connection, request } from '../../config';

import Product from '@modules/sales/infra/typeorm/entities/Product';
import { makeProductSut } from '../factories';

const productClass = makeProductSut();

const TOKEN = `Bearer ${process.env.TOKEN}`;

const createEndPoint = '/products/signup',
  listEndPoint = '/products/';
let commonEndPoint = '/products/';

describe('POST/GET/PUT/DELETE /products', function () {
  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.close();
  });
  it('Should create a product with all input fields and return {client}.', function (done) {
    request(app)
      .post(createEndPoint)
      .set('Authorization', TOKEN)
      .send(productClass.createRequest)
      .expect('Content-Type', /json/)
      .expect(Product)
      .expect((res) => {
        commonEndPoint += res.body.product_id;
        expect(res.body).toEqual(
          expect.objectContaining(productClass.createResponse)
        );
      })
      .end(done);
  });

  it('Should list products and return [{product}].', function (done) {
    request(app)
      .get(listEndPoint)
      .set('Authorization', TOKEN)
      .query(productClass.listRequest)
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
    request(app)
      .get(commonEndPoint)
      .set('Authorization', TOKEN)
      .expect('Content-Type', /json/)
      .expect(Product)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining(productClass.getResponse)
        );
      })
      .end(done);
  });

  it('Should update a product and return {product}.', function (done) {
    request(app)
      .put(commonEndPoint)
      .set('Authorization', TOKEN)
      .send(productClass.updateRequest)
      .expect('Content-Type', /json/)
      .expect(Product)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining(productClass.updateResponse)
        );
      })
      .end(done);
  });

  it('Should delete a product softly and return {client}.', function (done) {
    request(app)
      .delete(commonEndPoint)
      .set('Authorization', TOKEN)
      .expect('Content-Type', /json/)
      .expect(Product)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining(productClass.deleteResponse)
        );
      })
      .end(done);
  });
});
