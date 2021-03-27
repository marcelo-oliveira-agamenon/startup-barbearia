import faker from 'faker';

class SaleItemsClass {
  product_id: string;
  sale_id: string;
  service_id: string;
  quantity: number;
  value: number;
  limit: number;
  offset: number;

  constructor() {
    this.value = faker.random.number();
    this.limit = 3;
    this.offset = 1;
  }

  get createRequestWithProduct() {
    return {
      sale_id: this.sale_id,
      product_id: this.product_id,
      service_id: this.service_id,
      quantity: this.quantity,
      value: this.value
    };
  }
  get createResponseWithProduct() {
    const sale_items_id = expect.anything(),
      service_id = expect.anything(),
      created_at = expect.any(Date),
      updated_at = expect.any(Date),
      deleted_at = null;

    return {
      sale_items_id,
      service_id,
      created_at,
      updated_at,
      deleted_at,
      sale_id: this.sale_id,
      product_id: this.product_id,
      value: this.value,
      quantity: this.quantity
    };
  }
  // get listRequest() {
  //   return { limit: this.limit, offset: this.offset };
  // }

  // get getResponse() {
  //   const sale_id = expect.anything(),
  //     created_at = expect.anything(),
  //     updated_at = expect.anything(),
  //     value = expect.anything(),
  //     discount = expect.anything(),
  //     deleted_at = null;

  //   return {
  //     client_id: this.client_id,
  //     user_id: this.user_id,
  //     value,
  //     discount,
  //     is_discount_fixed: this.is_discount_fixed,
  //     sale_id,
  //     created_at,
  //     updated_at,
  //     deleted_at
  //   };
  // }

  // get updateRequest() {
  //   return {
  //     user_id: this.user_id,
  //     client_id: this.client_id,
  //     discount: this.discount,
  //     is_discount_fixed: this.is_discount_fixed
  //   };
  // }
  // get updateResponse() {
  //   const sale_id = expect.anything(),
  //     created_at = expect.anything(),
  //     updated_at = expect.anything(),
  //     deleted_at = null,
  //     discount = expect.anything(),
  //     value = expect.anything();

  //   return {
  //     client_id: this.client_id,
  //     user_id: this.user_id,
  //     is_discount_fixed: this.is_discount_fixed,
  //     value,
  //     discount,
  //     sale_id,
  //     created_at,
  //     updated_at,
  //     deleted_at
  //   };
  // }

  // get deleteResponse() {
  //   const sale_id = expect.anything(),
  //     created_at = expect.anything(),
  //     updated_at = expect.anything(),
  //     deleted_at = expect.anything(),
  //     discount = expect.anything(),
  //     value = expect.anything();

  //   return {
  //     client_id: this.client_id,
  //     user_id: this.user_id,
  //     is_discount_fixed: this.is_discount_fixed,
  //     value,
  //     discount,
  //     sale_id,
  //     created_at,
  //     updated_at,
  //     deleted_at
  //   };
  //}
}
export default SaleItemsClass;
