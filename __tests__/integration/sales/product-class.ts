import faker from 'faker';

class ProductClass {
  name: string;
  cost: number;
  value: number;
  description: string;
  discount: number;
  limit: number;
  offset: number;

  constructor() {
    this.name = faker.name.findName();
    this.cost = faker.random.number();
    (this.value = faker.random.number()),
      (this.description = faker.internet.email()),
      (this.discount = faker.random.number());
  }

  get createRequest() {
    return {
      name: this.name,
      cost: this.cost,
      value: this.value,
      description: this.description,
      discount: this.discount
    };
  }

  get createResponse() {
    const product_id = expect.anything(),
      created_at = expect.anything(),
      updated_at = expect.anything(),
      deleted_at = null;
    return {
      name: this.name,
      cost: this.cost,
      value: this.value,
      description: this.description,
      discount: this.discount,
      product_id,
      created_at,
      updated_at,
      deleted_at
    };
  }

  get listRequest() {
    return { limit: this.limit, offset: this.offset };
  }

  get getResponse() {
    const product_id = expect.anything(),
      name = expect.anything(),
      cost = expect.anything(),
      value = expect.anything(),
      description = expect.anything(),
      discount = expect.anything(),
      created_at = expect.anything(),
      updated_at = expect.anything(),
      deleted_at = null;

    return {
      product_id,
      name,
      cost,
      value,
      description,
      discount,
      created_at,
      updated_at,
      deleted_at
    };
  }

  get updateRequest() {
    return {
      name: faker.name.findName(),
      cost: faker.random.number(),
      value: faker.random.number(),
      description: faker.internet.email(),
      discount: faker.random.number()
    };
  }

  get updateResponse() {
    const product_id = expect.anything(),
      name = expect.anything(),
      cost = expect.anything(),
      value = expect.anything(),
      description = expect.anything(),
      discount = expect.anything(),
      created_at = expect.anything(),
      updated_at = expect.anything(),
      deleted_at = null;

    return {
      product_id,
      name,
      cost,
      value,
      description,
      discount,
      created_at,
      updated_at,
      deleted_at
    };
  }

  get deleteResponse() {
    const product_id = expect.anything(),
      name = expect.anything(),
      cost = expect.anything(),
      value = expect.anything(),
      description = expect.anything(),
      discount = expect.anything(),
      created_at = expect.anything(),
      updated_at = expect.anything(),
      deleted_at = expect.anything();

    return {
      product_id,
      name,
      cost,
      value,
      description,
      discount,
      created_at,
      updated_at,
      deleted_at
    };
  }
}

export default ProductClass;
