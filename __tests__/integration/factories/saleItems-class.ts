class SaleItemsClass {
  product_id: string;
  sale_id: string;
  service_id: string;
  quantity: number;
  value: number;
  limit: number;
  offset: number;

  constructor() {
    this.value = 10.5;
    this.limit = 3;
    this.offset = 1;
  }

  get createRequestWithProduct() {
    return {
      sale_id: this.sale_id,
      product_id: this.product_id,
      quantity: 10,
      value: this.value
    };
  }
  get createResponseWithProduct() {
    return {
      sale_items_id: expect.anything(),
      created_at: expect.anything(),
      updated_at: expect.anything(),
      deleted_at: null,
      sale_id: this.sale_id,
      product_id: this.product_id,
      value: expect.anything(),
      quantity: this.quantity
    };
  }

  get createRequestWithService() {
    return {
      sale_id: this.sale_id,
      service_id: this.service_id,
      value: this.value
    };
  }
  get createResponseWithService() {
    return {
      sale_items_id: expect.anything(),
      service_id: expect.anything(),
      created_at: expect.anything(),
      updated_at: expect.anything(),
      deleted_at: null,
      sale_id: this.sale_id,
      value: expect.anything()
    };
  }
  get listRequest() {
    return { limit: this.limit, offset: this.offset };
  }

  get getResponse() {
    return {
      sale_id: this.sale_id,
      service_id: this.service_id,
      product_id: null,
      quantity: null,
      value: expect.anything(),
      created_at: expect.anything(),
      updated_at: expect.anything(),
      deleted_at: null
    };
  }

  get updateRequest() {
    return {
      product_id: this.product_id,
      service_id: null,
      value: 90,
      quantity: 10,
      sale_id: this.sale_id
    };
  }

  get updateResponse() {
    return {
      sale_items_id: expect.anything(),
      sale_id: this.sale_id,
      service_id: null,
      product_id: this.product_id,
      value: expect.anything(),
      quantity: 10,
      created_at: expect.anything(),
      updated_at: expect.anything(),
      deleted_at: null
    };
  }

  get deleteResponse() {
    return {
      sale_items_id: expect.anything(),
      sale_id: this.sale_id,
      service_id: null,
      product_id: this.product_id,
      value: expect.anything(),
      quantity: 10,
      created_at: expect.anything(),
      updated_at: expect.anything(),
      deleted_at: expect.anything()
    };
  }
}
export default SaleItemsClass;
