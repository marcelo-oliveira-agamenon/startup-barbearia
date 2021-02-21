import { container } from 'tsyringe';

import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import ClientRepository from '@modules/users/infra/typeorm/repositories/ClientRepository';
import IClientRepository from '@modules/users/repositories/IClientRepository';

import ServiceRepository from '@modules/sales/infra/typeorm/repositories/ServiceRepository';
import IServiceRepository from '@modules/sales/repositories/IServiceRepository';
import IProductRepository from '@modules/sales/repositories/IProductRepository';
import ProductRepository from '@modules/sales/infra/typeorm/repositories/ProductRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IClientRepository>('ClientRepository', ClientRepository);
container.registerSingleton<IProductRepository>('ProductRepository', ProductRepository);

container.registerSingleton<IServiceRepository>(
  'ServiceRepository',
  ServiceRepository
);
