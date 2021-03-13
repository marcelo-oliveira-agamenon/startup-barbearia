import faker from 'faker';

class ClientClass {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  limit: number;
  offset: number;

  constructor() {
    this.name = faker.name.findName();
    this.cpf = faker.internet.password(14);
    this.email = faker.internet.email();
    this.phone = faker.phone.phoneNumber('(##) #####-####');
    this.limit = 3;
    this.offset = 1;
  }

  get createRequest() {
    return {
      name: this.name,
      cpf: this.cpf,
      email: this.email,
      phone: this.phone
    };
  }
  get createResponse() {
    const client_id = expect.anything(),
      created_at = expect.anything(),
      updated_at = expect.anything(),
      deleted_at = null;

    return {
      name: this.name,
      cpf: this.cpf,
      email: this.email,
      phone: this.phone,
      client_id,
      created_at,
      updated_at,
      deleted_at
    };
  }
  get listRequest() {
    return { limit: this.limit, offset: this.offset };
  }

  get getResponse() {
    const client_id = expect.anything(),
      created_at = expect.anything(),
      updated_at = expect.anything(),
      deleted_at = null;

    return {
      name: this.name,
      cpf: this.cpf,
      email: this.email,
      phone: this.phone,
      client_id,
      created_at,
      updated_at,
      deleted_at
    };
  }
  get updateRequest() {
    return {
      name: this.name,
      phone: this.phone,
      cpf: this.cpf,
      email: this.email
    };
  }
  get updateResponse() {
    const client_id = expect.anything(),
      created_at = expect.anything(),
      updated_at = expect.anything(),
      deleted_at = null;
    return {
      name: this.name,
      cpf: this.cpf,
      email: this.email,
      phone: this.phone,
      client_id,
      created_at,
      updated_at,
      deleted_at
    };
  }

  get deleteResponse() {
    const client_id = expect.anything(),
      created_at = expect.anything(),
      updated_at = expect.anything(),
      deleted_at = expect.anything();

    return {
      name: this.name,
      cpf: this.cpf,
      email: this.email,
      phone: this.phone,
      client_id,
      created_at,
      updated_at,
      deleted_at
    };
  }
}
export default ClientClass;
