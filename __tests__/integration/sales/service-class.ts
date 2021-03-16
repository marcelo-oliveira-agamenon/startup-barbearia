import faker from 'faker';

export default class ServiceClass {
  service_id: number;
  name: string;
  value: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;

  constructor() {
    this.name = faker.random.words();
    this.value = faker.random.number();
  }
}
