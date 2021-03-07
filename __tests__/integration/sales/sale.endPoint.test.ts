import request from 'supertest';
import 'dotenv/config';

import { User } from '@modules/users/infra/typeorm/entities/User';
import UserClass from '../users/user-class';
import CreateUserService from '@modules/users/services/user/CreateUserService';
import { container } from 'tsyringe';

const userClass = new UserClass();

const API = process.env.TEST_URL;
const TOKEN = `Bearer ${process.env.TOKEN}`;

const createEndPoint = '/sales/signup',
  listEndPoint = '/sales/',
  loginEndPoint = '/sales';
let commonEndPoint = '/sales/';

describe('POST/GET/PUT/DELETE /sales/', function () {
  beforeAll(async () => {
    const createUser = container.resolve(CreateUserService);
    createUser.execute(userClass);
  });
  it('Should create a user with all input fields and return {user}.', function (done) {
    request(API)
      .post(createEndPoint)
      .set('Authorization', TOKEN)
      .send(userClass.createRequest)
      .expect('Content-Type', /json/)
      .expect(User)
      .expect(201)
      .expect((res) => {
        commonEndPoint += res.body.user_id;
        expect(res.body).toEqual(
          expect.objectContaining(userClass.createResponse)
        );
      })
      .end(done);
  });

  // it('Should list users and return [{user}].', function (done) {
  //   request(API)
  //     .get(listEndPoint)
  //     .set('Authorization', TOKEN)
  //     .query(userClass.listRequest)
  //     .expect('Content-Type', /json/)
  //     .expect(User)
  //     .expect(200)
  //     .expect((res) => {
  //       if (res.body.length) {
  //         const firstElement = res.body[0];
  //         expect(firstElement).toHaveProperty('user_id');
  //         expect(firstElement).toHaveProperty('name');
  //         expect(firstElement).toHaveProperty('user_type');
  //         expect(firstElement).toHaveProperty('phone');
  //         expect(firstElement).toHaveProperty('cpf');
  //         expect(firstElement).toHaveProperty('email');
  //         expect(firstElement).toHaveProperty('is_active');
  //         expect(firstElement).toHaveProperty('created_at');
  //         expect(firstElement).toHaveProperty('updated_at');
  //         expect(firstElement).toHaveProperty('deleted_at');
  //       } else {
  //         expect(res.body).toEqual(expect.arrayContaining([]));
  //       }
  //     })
  //     .end(done);
  // });
  // it('Should get a user and return {user}.', function (done) {
  //   request(API)
  //     .get(commonEndPoint)
  //     .set('Authorization', TOKEN)
  //     .expect('Content-Type', /json/)
  //     .expect(User)
  //     .expect(200)
  //     .expect((res) => {
  //       expect(res.body).toEqual(
  //         expect.objectContaining(userClass.getResponse)
  //       );
  //     })
  //     .end(done);
  // });
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
