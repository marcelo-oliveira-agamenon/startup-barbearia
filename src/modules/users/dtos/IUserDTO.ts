import { UserRole } from '@modules/users/infra/typeorm/entities/User';

export interface ICreateUserDTO {
  user_name: string;
  user_type: UserRole;
  user_phone?: string;
  cpf: string;
  password: string;
}
