import faker from 'faker';

class PaymentMovementClass {
  payment_movement_id: string;
  value: number;
  payment_method_id: number;
  sale_id: string;
  created_at: Date;
  deleted_at: Date;
  limit: number;
  offset: number;

  constructor() {
    this.limit = 3;
    this.offset = 1;
  }

  get createRequest() {
    return {
      payment_movement_id: this.payment_movement_id,
      value: faker.random.number(),
      payment_method_id: this.payment_method_id,
      sale_id: this.sale_id,
      created_at: this.created_at
    };
  }

  get createResponse() {
    const payment_movement_id = expect.anything(),
      payment_method_id = expect.anything(),
      value = expect.anything(),
      sale_id = expect.anything(),
      created_at = expect.anything();
    return {
      payment_movement_id,
      payment_method_id,
      value,
      sale_id,
      created_at,
      deleted_at: null
    };
  }
}

export default PaymentMovementClass;
