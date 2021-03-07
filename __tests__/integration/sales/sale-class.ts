import { UserRole } from '@modules/users/infra/typeorm/entities/User';
import faker from 'faker';

class SaleClass {
  sale_id: string;
  client_id: string;
  user_id: string;
  valor_total: number;
  discount: number;
  limit: number;
  offset: number;
  created_at: Date;
  deleted_at: Date;

  constructor() {
    this.valor_total = faker.random.number();
    this.discount = faker.random.number(10);
    this.limit = 3;
    this.offset = 1;
  }

  get createRequest() {
    return {
      client_id: this.client_id,
      user_id: this.user_id,
      valor_total: this.valor_total,
      discount: this.discount
    };
  }
  get createResponse() {
    const user_id = expect.anything(),
      created_at = expect.anything(),
      updated_at = expect.anything(),
      deleted_at = null;

    return {};
  }
  get listRequest() {
    return {};
  }

  get getResponse() {
    const user_id = expect.anything(),
      created_at = expect.anything(),
      updated_at = expect.anything(),
      deleted_at = null;

    return {};
  }

  get deleteResponse() {
    const user_id = expect.anything(),
      created_at = expect.anything(),
      updated_at = expect.anything(),
      deleted_at = expect.anything(),
      is_active = false;

    return {};
  }
}
export default SaleClass;
