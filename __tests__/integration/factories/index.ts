import 'shared/container';
import { container } from 'tsyringe';

import ServiceClass from './service-class';
import ProductClass from './product-class';
import UserClass from './user-class';
import ClientClass from './client-class';
import SaleClass from './sale-class';
import StockClass from './stock-class';
import SaleItemsClass from './saleItems-class';
import ScheduleClass from './schedule-class';
import PaymentMovementClass from './paymentMovement-class';
import PaymentMethodClass from './paymentMethod-class';

import { CreateUserService } from '@modules/users/services/user';
import { CreateClientService } from '@modules/users/services/client';
import { CreateProductService } from '@modules/sales/services/product/CreateProductService';
import { CreateServiceService } from '@modules/sales/services/service/CreateServiceService';
import { CreateSaleService } from '@modules/sales/services/sale/CreateSaleService';
import { CreatePaymentMethodService } from '@modules/sales/services/paymentMethod';

export const makeServiceSut = () => new ServiceClass();

export const makeProductSut = () => new ProductClass();

export const makeUserSut = () => new UserClass();

export const makeClientSut = () => new ClientClass();

export const makePaymentMethodSut = () => new PaymentMethodClass();

export const makeSaleSut = async (): Promise<SaleClass> => {
  const saleClass = new SaleClass();
  const createUser = container.resolve(CreateUserService);
  const user = await createUser.execute(makeUserSut());
  if (user) saleClass.user_id = user.user_id;

  const createClient = container.resolve(CreateClientService);
  const client = await createClient.execute(makeUserSut());
  if (client) saleClass.client_id = client.client_id;

  return saleClass;
};

export const makePaymentMovementSut = async (): Promise<PaymentMovementClass> => {
  const paymentMovementClass = new PaymentMovementClass();
  const createSale = container.resolve(CreateSaleService);
  const createPaymentMethod = container.resolve(CreatePaymentMethodService);

  const sale = await createSale.execute((await makeSaleSut()).createRequest);
  const paymentMethod = await createPaymentMethod.execute(
    makePaymentMethodSut()
  );

  if (sale) paymentMovementClass.sale_id = sale.sale_id;
  if (paymentMethod)
    paymentMovementClass.payment_method_id = paymentMethod.payment_method_id;

  return paymentMovementClass;
};

export const makeStockSut = async (): Promise<StockClass> => {
  const stockClass = new StockClass();
  const createProduct = container.resolve(CreateProductService);

  const product = await createProduct.execute(makeProductSut());
  if (product) stockClass.product_id = product.product_id;

  return stockClass;
};

export const makeSaleItemsSut = async (): Promise<SaleItemsClass> => {
  const saleItemsClass = new SaleItemsClass();
  const createProduct = container.resolve(CreateProductService);
  const createService = container.resolve(CreateServiceService);
  const createSale = container.resolve(CreateSaleService);

  const product = await createProduct.execute(makeProductSut());
  const service = await createService.execute(makeServiceSut());
  const sale = await createSale.execute((await makeSaleSut()).createRequest);
  if (sale) saleItemsClass.sale_id = sale.sale_id;
  if (product) saleItemsClass.product_id = product.product_id;
  if (service) saleItemsClass.service_id = service.service_id;

  return saleItemsClass;
};

export const makeScheduleSut = async (): Promise<ScheduleClass> => {
  const scheduleClass = new ScheduleClass();
  const createUser = container.resolve(CreateUserService);
  const createClient = container.resolve(CreateClientService);
  const createService = container.resolve(CreateServiceService);

  const user = await createUser.execute(makeUserSut());
  const client = await createClient.execute(makeClientSut());
  const service = await createService.execute(makeServiceSut());

  if (user) scheduleClass.user_id = user.user_id;
  if (client) scheduleClass.client_id = client.client_id;
  if (service) scheduleClass.service_id = service.service_id;

  return scheduleClass;
};
