import faker from 'faker';

export default class ScheduleClass {
  user_id: string;
  client_id: string;
  service_id: number;
  start_date: Date;
  end_date: Date;
  status: boolean;
  description: string;
  limit: number;
  offset: number;
  created_at: Date;
  deleted_at: Date;

  constructor() {
    this.start_date = faker.date.future();
    this.end_date = faker.date.future();
    this.status = faker.random.boolean();
    this.description = faker.random.words();
  }

  get createRequest() {
    return {
      user_id: this.user_id,
      client_id: this.client_id,
      service_id: this.service_id,
      start_date: this.start_date,
      end_date: this.end_date,
      status: this.status,
      description: this.description
    };
  }

  get createResponse() {
    const id = expect.anything(),
      start_date = expect.anything(),
      end_date = expect.anything(),
      status = expect.anything(),
      description = expect.anything(),
      created_at = expect.anything(),
      updated_at = expect.anything(),
      deleted_at = null;

    return {
      id,
      user_id: this.user_id,
      client_id: this.client_id,
      service_id: this.service_id,
      start_date,
      end_date,
      status,
      description,
      created_at,
      updated_at,
      deleted_at
    };
  }

  get getResponse() {
    const id = expect.anything(),
      start_date = expect.anything(),
      end_date = expect.anything(),
      status = expect.anything(),
      description = expect.anything(),
      created_at = expect.anything(),
      updated_at = expect.anything(),
      deleted_at = null;

    return {
      id,
      user_id: this.user_id,
      client_id: this.client_id,
      service_id: this.service_id,
      start_date,
      end_date,
      status,
      description,
      created_at,
      updated_at,
      deleted_at
    };
  }

  get getFilterDate() {
    return {
      start_date: this.start_date,
      end_date: this.end_date
    };
  }

  get getListSet() {
    return {
      limit: this.limit,
      offset: this.offset
    };
  }

  get updateRequest() {
    return {
      user_id: this.user_id,
      client_id: this.client_id,
      service_id: this.service_id,
      start_date: this.start_date,
      end_date: this.end_date,
      status: this.status,
      description: this.description
    };
  }

  get updateResponse() {
    const id = expect.anything(),
      user_id = this.user_id,
      client_id = this.client_id,
      service_id = this.service_id,
      start_date = expect.anything(),
      end_date = expect.anything(),
      status = expect.anything(),
      description = expect.anything(),
      created_at = expect.anything(),
      updated_at = expect.anything(),
      deleted_at = null;

    return {
      id,
      user_id,
      client_id,
      service_id,
      start_date,
      end_date,
      status,
      description,
      created_at,
      updated_at,
      deleted_at
    };
  }

  get deleteResponse() {
    const id = expect.anything(),
      user_id = this.user_id,
      client_id = this.client_id,
      service_id = this.service_id,
      start_date = expect.anything(),
      end_date = expect.anything(),
      status = expect.anything(),
      description = expect.anything(),
      created_at = expect.anything(),
      updated_at = expect.anything(),
      deleted_at = expect.anything();

    return {
      id,
      user_id,
      service_id,
      client_id,
      start_date,
      end_date,
      description,
      status,
      created_at,
      updated_at,
      deleted_at
    };
  }
}
