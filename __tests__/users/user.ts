import request from 'supertest';
import express from 'express';
import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import config from '@shared/infra/typeorm/ormconfig';
let connection: Connection;

describe('POST /users/register', function () {
  beforeAll(async () => {
    connection = await createConnection(config);
  });

  it('responds with json', function (done) {
    const body = {
      user_name: 'teste',
      user_type: 'admin',
      user_phone: '75986667171',
      password: '6165165651'
    };

    request(express)
      .post('/users/register')
      .send(body)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);
  });

  afterAll(async () => {
    await connection.close();
  });
});
