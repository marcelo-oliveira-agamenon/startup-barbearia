import faker from 'faker';

class ProductClass {
  name: string;
  cost: number;
  value: number;
  description: string;
  discount: number;

  constructor() {
    this.name = faker.name.findName();
    this.cost = faker.random.number();
    this.value = faker.random.number(),
    this.description = faker.internet.email(),
    this.discount = faker.random.number();
  }

  get createRequest() {
    return {
      name: this.name,
      cost: this.cost,
      value: this.value,
      description: this.description,
      discount: this.discount
    }
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
    }
  }


}

export default ProductClass;
