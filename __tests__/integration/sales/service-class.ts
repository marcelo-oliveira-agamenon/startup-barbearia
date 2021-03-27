import { User } from '@modules/users/infra/typeorm/entities/User';
import faker from 'faker';

export default class ServiceClass {
  service_id: number;
  name: string;
  value: number;
  users: User[];
  limit: number;
  offset: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;

  constructor() {
    this.name = faker.random.words();
    this.value = faker.random.number();
    this.limit = 5;
    this.offset = 1;
  }

  get createRequest() {
    return {
      service_id: this.service_id,
      name: this.name,
      value: this.value,
      users: this.users
    };
  }

  get createResponse() {
    const service_id = expect.anything(),
      name = expect.anything(),
      value = expect.anything(),
      created_at = expect.anything(),
      updated_at = expect.anything(),
      deleted_at = null;

    return {
      service_id,
      name,
      value,
      created_at,
      updated_at,
      deleted_at
    };
  }

  get getListSet() {
    return {
      limit: this.limit,
      offset: this.offset
    };
  }

  get getResponse() {
    const service_id = expect.anything(),
      name = expect.anything(),
      value = expect.anything(),
      created_at = expect.anything(),
      updated_at = expect.anything(),
      deleted_at = null;

    return {
      service_id,
      name,
      value,
      created_at,
      updated_at,
      deleted_at
    };
  }

  get updateRequest() {
    return {
      service_id: this.service_id,
      name: this.name,
      value: this.value,
      users: this.users
    };
  }

  get updateResponse() {
    const service_id = expect.anything(),
      name = expect.anything(),
      value = expect.anything(),
      created_at = expect.anything(),
      updated_at = expect.anything(),
      deleted_at = null;

    return {
      service_id,
      name,
      value,
      created_at,
      updated_at,
      deleted_at
    };
  }

  get deleteResponse() {
    const service_id = expect.anything(),
      name = expect.anything(),
      value = expect.anything(),
      created_at = expect.anything(),
      updated_at = expect.anything(),
      deleted_at = expect.anything();

    return {
      service_id,
      name,
      value,
      created_at,
      updated_at,
      deleted_at
    };
  }
}
