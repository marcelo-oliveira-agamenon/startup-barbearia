import faker from 'faker';

class SaleClass {
  sale_id: string;
  client_id: string;
  user_id: string;
  value: number;
  discount: number;
  is_discount_fixed: boolean;
  limit: number;
  offset: number;
  created_at: Date;
  deleted_at: Date;

  constructor() {
    this.value = 10.0;
    this.discount = 10.0;
    this.is_discount_fixed = faker.random.boolean();
    this.limit = 3;
    this.offset = 1;
  }

  get createRequest() {
    return {
      client_id: this.client_id,
      user_id: this.user_id,
      value: this.value,
      discount: this.discount,
      is_discount_fixed: this.is_discount_fixed
    };
  }
  get createResponse() {
    const sale_id = expect.anything(),
      created_at = expect.anything(),
      updated_at = expect.anything(),
      value = expect.anything(),
      discount = expect.anything(),
      deleted_at = null;

    return {
      client_id: this.client_id,
      user_id: this.user_id,
      value,
      discount,
      is_discount_fixed: this.is_discount_fixed,
      sale_id,
      created_at,
      updated_at,
      deleted_at
    };
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
