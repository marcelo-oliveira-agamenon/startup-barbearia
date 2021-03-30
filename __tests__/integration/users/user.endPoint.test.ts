import { app, connection, request } from '../config';

import { makeUserSut } from '../factories';
import { User } from '@modules/users/infra/typeorm/entities/User';

const userClass = makeUserSut();

const TOKEN = `Bearer ${process.env.TOKEN}`;

const createEndPoint = '/users/signup',
  listEndPoint = '/users/',
  loginEndPoint = '/users';
let commonEndPoint = '/users/';

describe('POST/GET/PUT/LOGIN/DELETE /users/', function () {
  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.close();
  });
  it('Should create a user with all input fields and return {user}.', function (done) {
    request(app)
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

  it('Should list users and return [{user}].', function (done) {
    request(app)
      .get(listEndPoint)
      .set('Authorization', TOKEN)
      .query(userClass.listRequest)
      .expect('Content-Type', /json/)
      .expect(User)
      .expect(200)
      .expect((res) => {
        if (res.body.length) {
          const firstElement = res.body[0];
          expect(firstElement).toHaveProperty('user_id');
          expect(firstElement).toHaveProperty('name');
          expect(firstElement).toHaveProperty('user_type');
          expect(firstElement).toHaveProperty('phone');
          expect(firstElement).toHaveProperty('cpf');
          expect(firstElement).toHaveProperty('email');
          expect(firstElement).toHaveProperty('is_active');
          expect(firstElement).toHaveProperty('created_at');
          expect(firstElement).toHaveProperty('updated_at');
          expect(firstElement).toHaveProperty('deleted_at');
        } else {
          expect(res.body).toEqual(expect.arrayContaining([]));
        }
      })
      .end(done);
  });

  it('Should list users with services and return [{user}].', function (done) {
    request(app)
      .get(listEndPoint + 'list/services')
      .set('Authorization', TOKEN)
      .query(userClass.listRequest)
      .expect('Content-Type', /json/)
      .expect(User)
      .expect(200)
      .expect((res) => {
        if (res.body.length) {
          const firstElement = res.body[0];
          expect(firstElement).toHaveProperty('user_id');
          expect(firstElement).toHaveProperty('name');
          expect(firstElement).toHaveProperty('user_type');
          expect(firstElement).toHaveProperty('phone');
          expect(firstElement).toHaveProperty('cpf');
          expect(firstElement).toHaveProperty('email');
          expect(firstElement).toHaveProperty('is_active');
          expect(firstElement).toHaveProperty('services');
          expect(firstElement).toHaveProperty('created_at');
          expect(firstElement).toHaveProperty('updated_at');
          expect(firstElement).toHaveProperty('deleted_at');
        } else {
          expect(res.body).toEqual(expect.arrayContaining([]));
        }
      })
      .end(done);
  });

  it('Should get a user and return {user}.', function (done) {
    request(app)
      .get(commonEndPoint)
      .set('Authorization', TOKEN)
      .expect('Content-Type', /json/)
      .expect(User)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining(userClass.getResponse)
        );
      })
      .end(done);
  });
  it('Should update a user and return {user}.', function (done) {
    request(app)
      .put(commonEndPoint)
      .set('Authorization', TOKEN)
      .send(userClass.updateRequest)
      .expect('Content-Type', /json/)
      .expect(User)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining(userClass.updateResponse)
        );
      })
      .end(done);
  });
  it('Should login and return {auth, token}.', function (done) {
    request(app)
      .post(loginEndPoint)
      .set('Authorization', TOKEN)
      .send(userClass.login)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('auth');
        expect(res.body).toHaveProperty('token');
      })
      .end(done);
  });
  it('Should delete a user softly and return {user}.', function (done) {
    request(app)
      .delete(commonEndPoint)
      .set('Authorization', TOKEN)
      .expect('Content-Type', /json/)
      .expect(User)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining(userClass.deleteResponse)
        );
      })
      .end(done);
  });
});
