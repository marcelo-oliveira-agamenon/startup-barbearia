import { container } from 'tsyringe';

import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';

import ClientRepository from '@modules/users/infra/typeorm/repositories/ClientRepository';
import IClientRepository from '@modules/users/repositories/IClientRepository';

import ServiceRepository from '@modules/sales/infra/typeorm/repositories/ServiceRepository';
import IServiceRepository from '@modules/sales/repositories/IServiceRepository';

import IProductRepository from '@modules/sales/repositories/IProductRepository';
import ProductRepository from '@modules/sales/infra/typeorm/repositories/ProductRepository';

import PaymentMethodRepository from '@modules/sales/infra/typeorm/repositories/PaymentMethodRepository';
import IPaymentMethodRepository from '@modules/sales/repositories/IPaymentMethodRepository';

import ScheduleRepository from '@modules/schedules/infra/typeorm/repositories/ScheduleRepository';
import IScheduleRepository from '@modules/schedules/repositories/IScheduleRepository';

import SaleRepository from '@modules/sales/infra/typeorm/repositories/SaleRepository';
import ISaleRepository from '@modules/sales/repositories/ISaleRepository';
import IStockRepository from '@modules/sales/repositories/IStockRepository';
import StockRepository from '@modules/sales/infra/typeorm/repositories/StockRepository';
import IPaymentMovementRepository from '@modules/sales/repositories/IPaymentMovementRepository';
import PaymentMovementRepository from '@modules/sales/infra/typeorm/repositories/PaymentMovementRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IClientRepository>(
  'ClientRepository',
  ClientRepository
);
container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository
);

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
);

container.registerSingleton<IPaymentMethodRepository>(
  'PaymentMethodRepository',
  PaymentMethodRepository
);

container.registerSingleton<IStockRepository>(
  'StockRepository',
  StockRepository
);

container.registerSingleton<IPaymentMovementRepository>(
  'PaymentMovementRepository',
  PaymentMovementRepository
);

container.registerSingleton<ISaleRepository>('SaleRepository', SaleRepository);
