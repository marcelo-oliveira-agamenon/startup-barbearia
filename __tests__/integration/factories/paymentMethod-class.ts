import faker from 'faker';

class PaymentMethodClass {
  payment_method_id: number;
  name: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  limit: number;
  offset: number;

  constructor() {
    this.name = faker.name.findName();
    this.is_active = true;
    this.limit = 3;
    this.offset = 1;
  }

  get createRequest() {
    return {
      name: this.name,
      is_active: this.is_active
    };
  }

  get createResponse() {
    const payment_method_id = expect.anything(),
      created_at = expect.anything(),
      updated_at = expect.anything();
    return {
      payment_method_id,
      name: this.name,
      is_active: this.is_active,
      created_at,
      updated_at
    };
  }

  get listRequest() {
    return { limit: this.limit, offset: this.offset };
  }

  get getResponse() {
    const payment_method_id = expect.anything(),
      created_at = expect.anything(),
      updated_at = expect.anything();
    return {
      payment_method_id,
      name: this.name,
      is_active: this.is_active,
      created_at,
      updated_at
    };
  }

  get updateRequest() {
    return {
      name: faker.name.findName(),
      is_active: !this.is_active
    };
  }

  get updateResponse() {
    const payment_method_id = expect.anything(),
      name = expect.anything(),
      is_active = expect.anything(),
      created_at = expect.anything(),
      updated_at = expect.anything();

    return {
      payment_method_id,
      name,
      is_active,
      created_at,
      updated_at
    };
  }

  get deleteResponse() {
    const name = expect.anything(),
      is_active = false,
      created_at = expect.anything(),
      updated_at = expect.anything();

    return {
      name,
      is_active,
      created_at,
      updated_at
    };
  }
}

export default PaymentMethodClass;
