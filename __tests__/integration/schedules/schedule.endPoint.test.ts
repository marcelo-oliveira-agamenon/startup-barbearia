import { app, connection, request } from '../../config';

import { Schedule } from '@modules/schedules/infra/typeorm/entities/Schedule';
import { makeScheduleSut } from '../factories';
import ScheduleClass from '../factories/schedule-class';

let scheduleClass: ScheduleClass;

const TOKEN = `Bearer ${process.env.TOKEN}`;

const createEndPoint = '/schedules/register',
  listEndPoint = '/schedules/',
  filterDatePoint = '/schedules/date/filter';
let commonEndPoint = '/schedules/';
let commonEndPointClient = '/schedules/client/';
let commonEndPointUser = '/schedules/user/';

describe('POST/GET/PUT/DELETE /schedules/', function () {
  beforeAll(async () => {
    await connection.create();
    scheduleClass = await makeScheduleSut();
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Should create a schedule with all input fields and return {schedule}.', function (done) {
    request(app)
      .post(createEndPoint)
      .set('Authorization', TOKEN)
      .send(scheduleClass.createRequest)
      .expect('Content-Type', /json/)
      .expect(Schedule)
      .expect(201)
      .expect((res) => {
        commonEndPoint += res.body.schedule_id;
        commonEndPointClient += res.body.client_id;
        commonEndPointUser += res.body.user_id;
        expect(res.body).toEqual(
          expect.objectContaining(scheduleClass.createResponse)
        );
      })
      .end(done);
  });

  it('Should list schedules and return [{schedule}].', function (done) {
    request(app)
      .get(listEndPoint)
      .set('Authorization', TOKEN)
      .query(scheduleClass.getListSet)
      .expect('Content-Type', /json/)
      .expect(Schedule)
      .expect(200)
      .expect((res) => {
        if (res.body.length) {
          const firstElement = res.body[0];
          expect(firstElement).toHaveProperty('schedule_id');
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
    request(app)
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
    request(app)
      .get(commonEndPointClient)
      .set('Authorization', TOKEN)
      .expect('Content-Type', /json/)
      .expect(Schedule)
      .expect(200)
      .expect((res) => {
        if (res.body.length) {
          const firstElement = res.body[0];
          expect(firstElement).toHaveProperty('schedule_id');
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
    request(app)
      .get(commonEndPointUser)
      .set('Authorization', TOKEN)
      .expect('Content-Type', /json/)
      .expect(Schedule)
      .expect(200)
      .expect((res) => {
        if (res.body.length) {
          const firstElement = res.body[0];
          expect(firstElement).toHaveProperty('schedule_id');
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
    request(app)
      .get(filterDatePoint)
      .send(scheduleClass.getFilterDate)
      .set('Authorization', TOKEN)
      .expect('Content-Type', /json/)
      .expect(Schedule)
      .expect(200)
      .expect((res) => {
        if (res.body.length) {
          const firstElement = res.body[0];
          expect(firstElement).toHaveProperty('schedule_id');
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
    request(app)
      .put(commonEndPoint)
      .set('Authorization', TOKEN)
      .send(scheduleClass.updateRequest)
      .expect('Content-Type', /json/)
      .expect(Schedule)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining(scheduleClass.updateResponse)
        );
      })
      .end(done);
  });

  it('Should delete a schedule softly and return {schedule}.', function (done) {
    request(app)
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
