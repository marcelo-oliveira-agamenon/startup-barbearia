import 'dotenv/config';
import request from 'supertest';
import app from '@shared/infra/config/app';
import connection from '../config/connection';

export { request, app, connection };
