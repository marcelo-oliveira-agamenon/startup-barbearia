import { UserRole } from '@modules/users/infra/typeorm/entities/User';

export interface ICreateUserDTO {
  name: string;
  user_type: UserRole;
  phone?: string;
  cpf?: string;
  email: string;
  password: string;
  confirmPassword: string;
  is_active?: boolean;
}

export interface IUpdateUserDTO {
  name?: string;
  user_type?: UserRole;
  phone?: string;
  cpf?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  is_active?: boolean;
}
