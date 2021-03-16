class StockClass {
  stock_id: number;
  quantity: number;
  product_id: string;
  created_at: Date;
  limit: number;
  offset: number;

  constructor() {
    this.quantity = 10;
    this.limit = 3;
    this.offset = 1;
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

    get getResponse() {
    const stock_id = expect.anything(),
      product_id = expect.anything(),
      created_at = expect.anything(),
      quantity = expect.anything();

    return {
      stock_id,
      product_id,
      quantity,
      created_at
    };
  }

    get listRequest() {
    return { limit: this.limit, offset: this.offset };
  }

  get updateRequest() {
    return {
      stock_id: this.stock_id,
      quantity: this.quantity,
    };
  }
  get updateResponse() {
    const stock_id = expect.anything(),
      created_at = expect.anything(),
      product_id =  expect.anything(),
      quantity = expect.anything();

    return {
      stock_id,
      product_id,
      quantity,
      created_at
    };
  }
}

export default StockClass;
