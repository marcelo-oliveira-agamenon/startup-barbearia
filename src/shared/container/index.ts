import { container } from 'tsyringe';

import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import ClientRepository from '@modules/users/infra/typeorm/repositories/ClientRepository';
import IClientRepository from '@modules/users/repositories/IClientRepository';
import ServiceRepository from '@modules/sales/infra/typeorm/repositories/ServiceRepository';
import IServiceRepository from '@modules/sales/repositories/IServiceRepository';
import PaymentMethodRepository from '@modules/sales/infra/typeorm/repositories/PaymentMethodRepository';
import IPaymentMethodRepository from '@modules/sales/repositories/IPaymentMethodRepository';

import ScheduleRepository from '@modules/schedules/infra/typeorm/repositories/ScheduleRepository';
import IScheduleRepository from '@modules/schedules/repositories/IScheduleRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IClientRepository>(
  'ClientRepository',
  ClientRepository
);
container.registerSingleton<IServiceRepository>(
  'ServiceRepository',
  ServiceRepository
);
container.registerSingleton<IScheduleRepository>(
  'ScheduleRepository',
  ScheduleRepository

container.registerSingleton<IPaymentMethodRepository>(
  'PaymentMethodRepository',
  PaymentMethodRepository
);
