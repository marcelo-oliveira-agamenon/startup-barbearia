import { container } from 'tsyringe';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import ServicesRepository from '@modules/sales/infra/typeorm/repositories/ServicesRepository';
import IServicesRepository from '@modules/sales/repositories/IServicesRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IServicesRepository>(
  'ServicesRepository',
  ServicesRepository
);
