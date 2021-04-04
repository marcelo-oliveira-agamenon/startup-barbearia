import { connection } from '../../config';
import { GetPaymentMethodService } from '@modules/sales/services/paymentMethod/GetPaymentMethodService';
import PaymentMethodRepository from '@modules/sales/infra/typeorm/repositories/PaymentMethodRepository';

import AppError from '@shared/errors/AppError';

describe('Should validate payment method get service', () => {
  beforeAll(async () => {
    await connection.create();
  });
  beforeEach(async () => {
    await connection.clear();
  });
  afterAll(async () => {
    await connection.close();
  });

  test('Should throws if payment method does not exist', async () => {
    const paymentMethodRepository = new PaymentMethodRepository();

    const getPaymentMethod = new GetPaymentMethodService(
      paymentMethodRepository
    );

    const promise = getPaymentMethod.execute({ payment_method_id: 1 });
    await expect(promise).rejects.toEqual(
      new AppError('This payment method does not exist!')
    );
  });

  test('Should get payment method if it exists', async () => {
    const paymentMethodRepository = new PaymentMethodRepository();
    const getPaymentMethod = new GetPaymentMethodService(
      paymentMethodRepository
    );

    const paymentMethodCreated = await paymentMethodRepository.create({
      name: 'any_name',
      is_active: false
    });
    const paymentMethod = await getPaymentMethod.execute({
      payment_method_id: paymentMethodCreated.payment_method_id
    });

    expect(paymentMethod).toEqual(paymentMethodCreated);
  });

  test('Should call findById method with correct param', async () => {
    const paymentMethodRepository = new PaymentMethodRepository();
    const getPaymentMethod = new GetPaymentMethodService(
      paymentMethodRepository
    );
    const findByIdSpy = jest.spyOn(paymentMethodRepository, 'findById');
    const paymentMethodCreated = await paymentMethodRepository.create({
      name: 'any_name',
      is_active: false
    });
    await getPaymentMethod.execute({
      payment_method_id: paymentMethodCreated.payment_method_id
    });

    expect(findByIdSpy).toHaveBeenLastCalledWith(
      paymentMethodCreated.payment_method_id
    );
  });
});
