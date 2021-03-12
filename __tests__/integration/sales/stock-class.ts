import faker from 'faker';

class StockClass {
  stock_id: number;
  quantity: number;
  product_id: string;
  created_at: Date;

  constructor() {
    this.quantity = 10;
  }

  get createRequest() {
    return {
      quantity: this.quantity,
      product_id: this.product_id,
    };
  }

  get createResponse() {
    const stock_id = expect.anything(),
    product_id = expect.anything(),
    quantity = expect.anything(),
    created_at = expect.anything()

    return {
      stock_id,
      quantity,
      product_id,
      created_at
    };
  }
}

export default StockClass;
