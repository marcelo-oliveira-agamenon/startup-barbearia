import { container } from 'tsyringe';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import ClientRepository from '@modules/users/infra/typeorm/repositories/ClientRepository';
import IClientRepository from '@modules/users/repositories/IClientRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IClientRepository>('ClientRepository', ClientRepository);
