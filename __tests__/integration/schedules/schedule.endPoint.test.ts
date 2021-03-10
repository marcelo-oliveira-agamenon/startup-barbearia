import request from 'supertest';
import 'reflect-metadata';
import 'shared/container';
import 'dotenv/config';

import { container } from 'tsyringe';
import { Connection, createConnection } from 'typeorm';
import config from '@shared/infra/typeorm/ormconfig';

import { CreateUserService } from '@modules/users/services/user';
import { CreateClientService } from '@modules/users/services/client';
import { CreateServiceService } from '@modules/sales/services/service';
import { Schedule } from '@modules/schedules/infra/typeorm/entities/Schedule';
import ScheduleClass from './schedule-class';
import UserClass from '../users/user-class';
import ClientClass from '../users/client-class';
import ServiceClass from '../sales/service-class';

const scheduleClass = new ScheduleClass();
const userClass = new UserClass();
const clientClass = new ClientClass();
const serviceClass = new ServiceClass();

const API = process.env.TEST_URL;
const TOKEN = `Bearer ${process.env.TOKEN}`;
let connection: Connection;

const createEndPoint = '/schedules/register',
  listEndPoint = '/schedules/',
  filterDatePoint = '/schedules/date/filter';
let commonEndPoint = '/schedules/';
let commonEndPointClient = '/schedules/client/';
let commonEndPointUser = '/schedules/user/';

describe('POST/GET/PUT/DELETE /schedules/', function () {
  beforeAll(async () => {
    connection = await createConnection(config);

    const createUser = container.resolve(CreateUserService);
    const createClient = container.resolve(CreateClientService);
    const createService = container.resolve(CreateServiceService);

    const user = await createUser.execute(userClass);
    const client = await createClient.execute(clientClass);
    const service = await createService.execute(serviceClass);

    if (user) scheduleClass.user_id = user.user_id;
    if (client) scheduleClass.client_id = client.client_id;
    if (service) scheduleClass.service_id = service.service_id;
  });
  afterAll(async () => {
    await connection.close();
  });
  it('Should create a schedule with all input fields and return {schedule}.', function (done) {
    request(API)
      .post(createEndPoint)
      .set('Authorization', TOKEN)
      .send(scheduleClass.createRequest)
      .expect('Content-Type', /json/)
      .expect(Schedule)
      .expect(201)
      .expect((res) => {
        commonEndPoint += res.body.id;
        commonEndPointClient += res.body.client_id;
        commonEndPointUser += res.body.user_id;
        expect(res.body).toEqual(
          expect.objectContaining(scheduleClass.createResponse)
        );
      })
      .end(done);
  });

  it('Should list schedules and return [{schedule}].', function (done) {
    request(API)
      .get(listEndPoint)
      .set('Authorization', TOKEN)
      .query(scheduleClass.getListSet)
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
      .set('Authorization', TOKEN)
      .expect('Content-Type', /json/)
      .expect(Schedule)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining(scheduleClass.getResponse)
        );
      })
      .end(done);
  });

  it('Should list schedules by client id and return [{schedule}].', function (done) {
    request(API)
      .get(commonEndPointClient)
      .set('Authorization', TOKEN)
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
      .set('Authorization', TOKEN)
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
      .send(scheduleClass.getFilterDate)
      .set('Authorization', TOKEN)
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

  // it('Should update a schedule and return {schedule}.', function (done) {
  //   request(API)
  //     .put(commonEndPoint)
  //     .set('Authorization', TOKEN)
  //     .send(scheduleClass.updateRequest)
  //     .expect('Content-Type', /json/)
  //     .expect(Schedule)
  //     .expect(200)
  //     .expect((res) => {
  //       expect(res.body).toEqual(
  //         expect.objectContaining(scheduleClass.updateResponse)
  //       );
  //     })
  //     .end(done);
  // });

  it('Should delete a schedule softly and return {schedule}.', function (done) {
    request(API)
      .delete(commonEndPoint)
      .set('Authorization', TOKEN)
      .expect('Content-Type', /json/)
      .expect(Schedule)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining(scheduleClass.deleteResponse)
        );
      })
      .end(done);
  });
});
