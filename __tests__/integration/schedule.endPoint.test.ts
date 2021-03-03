import request from 'supertest';
import 'dotenv/config';

import { Schedule } from '@modules/schedules/infra/typeorm/entities/Schedule';

import faker from 'faker';

const API = process.env.TEST_URL;

const body = {
    user_id: '180e0ffe-c196-4bf1-bcee-4e3ef52ff287',
    client_id: '0cf031f2-afcf-4687-b4a7-f7562bc80d5b',
    service_id: 1,
    start_date: faker.date.future(),
    end_date: faker.date.future(),
    status: faker.random.boolean(),
    description: faker.random.words()
  },
  commonResponse = {
    id: expect.anything(),
    user_id: '180e0ffe-c196-4bf1-bcee-4e3ef52ff287',
    client_id: '0cf031f2-afcf-4687-b4a7-f7562bc80d5b',
    service_id: 1,
    start_date: expect.anything(),
    end_date: expect.anything(),
    status: expect.anything(),
    description: expect.anything(),
    created_at: expect.anything(),
    updated_at: expect.anything(),
    deleted_at: null
  },
  listQuery = {
    limit: faker.random.number(),
    offset: 1
  },
  dateFilter = {
    start_date: faker.date.future(),
    end_date: faker.date.future()
  },
  updateBody = {
    user_id: '180e0ffe-c196-4bf1-bcee-4e3ef52ff287',
    client_id: '0cf031f2-afcf-4687-b4a7-f7562bc80d5b',
    service_id: 1,
    start_date: faker.date.future(),
    end_date: faker.date.future(),
    status: faker.random.boolean(),
    description: faker.random.words()
  },
  updateResponse = {
    id: expect.anything(),
    user_id: '180e0ffe-c196-4bf1-bcee-4e3ef52ff287',
    client_id: '0cf031f2-afcf-4687-b4a7-f7562bc80d5b',
    service_id: 1,
    start_date: expect.anything(),
    end_date: expect.anything(),
    status: expect.anything(),
    description: expect.anything(),
    created_at: expect.anything(),
    updated_at: expect.anything(),
    deleted_at: null
  },
  deleteResponse = {
    id: expect.anything(),
    user_id: '180e0ffe-c196-4bf1-bcee-4e3ef52ff287',
    client_id: '0cf031f2-afcf-4687-b4a7-f7562bc80d5b',
    service_id: 1,
    start_date: expect.anything(),
    end_date: expect.anything(),
    status: expect.anything(),
    description: expect.anything(),
    created_at: expect.anything(),
    updated_at: expect.anything(),
    deleted_at: expect.anything()
  };
const createEndPoint = '/schedules/register',
  listEndPoint = '/schedules/',
  filterDatePoint = '/schedules/date/filter';
let commonEndPoint = '/schedules/';
let commonEndPointClient = '/schedules/client/';
let commonEndPointUser = '/schedules/user/';

describe('POST/GET/PUT/DELETE /schedules/', function () {
  it('Should create a schedule with all input fields and return {schedule}.', function (done) {
    request(API)
      .post(createEndPoint)
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .send(body)
      .expect('Content-Type', /json/)
      .expect(Schedule)
      .expect(201)
      .expect((res) => {
        commonEndPoint += res.body.id;
        commonEndPointClient += res.body.client_id;
        commonEndPointUser += res.body.user_id;
        expect(res.body).toEqual(expect.objectContaining(commonResponse));
      })
      .end(done);
  });

  it('Should list schedules and return [{schedule}].', function (done) {
    request(API)
      .get(listEndPoint)
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .query(listQuery)
      .expect('Content-Type', /json/)
      .expect(Schedule)
      .expect(200)
      .expect((res) => {
        if (res.body.length) {
          const firstElement = res.body[0];
          expect(firstElement).toHaveProperty('id');
          expect(firstElement).toHaveProperty('user_id');
          expect(firstElement).toHaveProperty('client_id');
          expect(firstElement).toHaveProperty('service_id');
          expect(firstElement).toHaveProperty('start_date');
          expect(firstElement).toHaveProperty('end_date');
          expect(firstElement).toHaveProperty('status');
          expect(firstElement).toHaveProperty('description');
          expect(firstElement).toHaveProperty('created_at');
          expect(firstElement).toHaveProperty('updated_at');
          expect(firstElement).toHaveProperty('deleted_at');
        } else {
          expect(res.body).toEqual(expect.arrayContaining([]));
        }
      })
      .end(done);
  });

  it('Should get a schedule and return {schedule}.', function (done) {
    request(API)
      .get(commonEndPoint)
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .expect('Content-Type', /json/)
      .expect(Schedule)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expect.objectContaining(commonResponse));
      })
      .end(done);
  });

  it('Should list schedules by client id and return [{schedule}].', function (done) {
    request(API)
      .get(commonEndPointClient)
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .expect('Content-Type', /json/)
      .expect(Schedule)
      .expect(200)
      .expect((res) => {
        if (res.body.length) {
          const firstElement = res.body[0];
          expect(firstElement).toHaveProperty('id');
          expect(firstElement).toHaveProperty('user_id');
          expect(firstElement).toHaveProperty('client_id');
          expect(firstElement).toHaveProperty('service_id');
          expect(firstElement).toHaveProperty('start_date');
          expect(firstElement).toHaveProperty('end_date');
          expect(firstElement).toHaveProperty('status');
          expect(firstElement).toHaveProperty('description');
          expect(firstElement).toHaveProperty('created_at');
          expect(firstElement).toHaveProperty('updated_at');
          expect(firstElement).toHaveProperty('deleted_at');
        } else {
          expect(res.body).toEqual(expect.arrayContaining([]));
        }
      })
      .end(done);
  });

  it('Should list schedules by user id and return [{schedule}].', function (done) {
    request(API)
      .get(commonEndPointUser)
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .expect('Content-Type', /json/)
      .expect(Schedule)
      .expect(200)
      .expect((res) => {
        if (res.body.length) {
          const firstElement = res.body[0];
          expect(firstElement).toHaveProperty('id');
          expect(firstElement).toHaveProperty('user_id');
          expect(firstElement).toHaveProperty('client_id');
          expect(firstElement).toHaveProperty('service_id');
          expect(firstElement).toHaveProperty('start_date');
          expect(firstElement).toHaveProperty('end_date');
          expect(firstElement).toHaveProperty('status');
          expect(firstElement).toHaveProperty('description');
          expect(firstElement).toHaveProperty('created_at');
          expect(firstElement).toHaveProperty('updated_at');
          expect(firstElement).toHaveProperty('deleted_at');
        } else {
          expect(res.body).toEqual(expect.arrayContaining([]));
        }
      })
      .end(done);
  });

  it('Should list schedules by date and return [{schedule}].', function (done) {
    request(API)
      .get(filterDatePoint)
      .send(dateFilter)
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .expect('Content-Type', /json/)
      .expect(Schedule)
      .expect(200)
      .expect((res) => {
        if (res.body.length) {
          const firstElement = res.body[0];
          expect(firstElement).toHaveProperty('id');
          expect(firstElement).toHaveProperty('user_id');
          expect(firstElement).toHaveProperty('client_id');
          expect(firstElement).toHaveProperty('service_id');
          expect(firstElement).toHaveProperty('start_date');
          expect(firstElement).toHaveProperty('end_date');
          expect(firstElement).toHaveProperty('status');
          expect(firstElement).toHaveProperty('description');
          expect(firstElement).toHaveProperty('created_at');
          expect(firstElement).toHaveProperty('updated_at');
          expect(firstElement).toHaveProperty('deleted_at');
        } else {
          expect(res.body).toEqual(expect.arrayContaining([]));
        }
      })
      .end(done);
  });

  it('Should update a schedule and return {schedule}.', function (done) {
    request(API)
      .put(commonEndPoint)
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .send(updateBody)
      .expect('Content-Type', /json/)
      .expect(Schedule)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expect.objectContaining(updateResponse));
      })
      .end(done);
  });

  it('Should delete a schedule softly and return {schedule}.', function (done) {
    request(API)
      .delete(commonEndPoint)
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .expect('Content-Type', /json/)
      .expect(Schedule)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expect.objectContaining(deleteResponse));
      })
      .end(done);
  });
});
