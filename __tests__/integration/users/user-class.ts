import { UserRole } from '@modules/users/infra/typeorm/entities/User';
import faker from 'faker';

class UserClass {
  name: string;
  user_type: UserRole;
  phone: string;
  cpf: string;
  password: string;
  confirmPassword: string;
  email: string;
  is_active: boolean;
  limit: number;
  offset: number;

  constructor() {
    this.name = faker.name.findName();
    this.user_type = UserRole.ADMIN;
    this.phone = faker.phone.phoneNumber();
    this.cpf = faker.internet.password(14);
    this.email = faker.internet.email();
    this.is_active = faker.random.boolean();
    this.password = faker.internet.password(6);
    this.confirmPassword = this.password;
    this.limit = 3;
    this.offset = 1;
  }

  get createRequest() {
    return {
      name: this.name,
      user_type: this.user_type,
      phone: this.phone,
      cpf: this.cpf,
      email: this.email,
      is_active: this.is_active,
      password: this.password,
      confirmPassword: this.confirmPassword
    };
  }
  get createResponse() {
    const user_id = expect.anything(),
      created_at = expect.anything(),
      updated_at = expect.anything(),
      deleted_at = null;

    return {
      name: this.name,
      user_type: this.user_type,
      phone: this.phone,
      cpf: this.cpf,
      email: this.email,
      is_active: this.is_active,
      user_id,
      created_at,
      updated_at,
      deleted_at
    };
  }
  get listRequest() {
    return { limit: this.limit, offset: this.offset };
  }

  get getResponse() {
    const user_id = expect.anything(),
      created_at = expect.anything(),
      updated_at = expect.anything(),
      deleted_at = null;

    return {
      name: this.name,
      user_type: this.user_type,
      phone: this.phone,
      cpf: this.cpf,
      email: this.email,
      is_active: this.is_active,
      user_id,
      created_at,
      updated_at,
      deleted_at
    };
  }
  get updateRequest() {
    return {
      name: this.name,
      user_type: this.user_type,
      phone: this.phone,
      cpf: this.cpf,
      password: this.password,
      confirmPassword: this.password,
      email: this.email,
      is_active: false
    };
  }
  get updateResponse() {
    const user_id = expect.anything(),
      created_at = expect.anything(),
      updated_at = expect.anything(),
      deleted_at = null;
    return {
      name: this.name,
      user_type: this.user_type,
      phone: this.phone,
      cpf: this.cpf,
      email: this.email,
      is_active: false,
      user_id,
      created_at,
      updated_at,
      deleted_at
    };
  }
  get login() {
    return { email: this.email, password: this.password };
  }
  get deleteResponse() {
    const user_id = expect.anything(),
      created_at = expect.anything(),
      updated_at = expect.anything(),
      deleted_at = expect.anything(),
      is_active = false;

    return {
      name: this.name,
      user_type: this.user_type,
      phone: this.phone,
      cpf: this.cpf,
      email: this.email,
      user_id,
      is_active,
      created_at,
      updated_at,
      deleted_at
    };
  }
}
export default UserClass;
