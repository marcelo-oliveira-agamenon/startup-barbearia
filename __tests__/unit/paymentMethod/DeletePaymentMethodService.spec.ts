import { connection } from '../../config';
import { DeletePaymentMethodService } from '@modules/sales/services/paymentMethod/DeletePaymentMethodService';
import PaymentMethodRepository from '@modules/sales/infra/typeorm/repositories/PaymentMethodRepository';

import AppError from '@shared/errors/AppError';

describe('Should validate payment method delete service', () => {
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

    const deletePaymentMethod = new DeletePaymentMethodService(
      paymentMethodRepository
    );

    jest
      .spyOn(paymentMethodRepository, 'findById')
      .mockReturnValueOnce(new Promise((resolve) => resolve(undefined)));
    const promise = deletePaymentMethod.execute({ payment_method_id: 1 });
    await expect(promise).rejects.toEqual(
      new AppError('This payment method does not exist!')
    );
  });
  test('Should delete if payment method exists', async () => {
    const paymentMethodRepository = new PaymentMethodRepository();
    const deletePaymentMethod = new DeletePaymentMethodService(
      paymentMethodRepository
    );
    const {
      payment_method_id,
      ...paymentMethodCreated
    } = await paymentMethodRepository.create({
      name: 'any_name',
      is_active: false
    });
    const paymentMethod = await deletePaymentMethod.execute({
      payment_method_id
    });
    expect(paymentMethod).toEqual(paymentMethodCreated);
  });

  test('Should call finById function with correct param', async () => {
    const paymentMethodRepository = new PaymentMethodRepository();
    const deletePaymentMethod = new DeletePaymentMethodService(
      paymentMethodRepository
    );
    const findByIdSpy = jest.spyOn(paymentMethodRepository, 'findById');
    const paymentMethod = await paymentMethodRepository.create({
      name: 'any_name',
      is_active: false
    });
    await deletePaymentMethod.execute({
      payment_method_id: paymentMethod.payment_method_id
    });
    expect(findByIdSpy).toHaveBeenCalledWith(paymentMethod.payment_method_id);
  });

  test('Should call deleteById function with correct param', async () => {
    const paymentMethodRepository = new PaymentMethodRepository();
    const deletePaymentMethod = new DeletePaymentMethodService(
      paymentMethodRepository
    );

    const paymentMethod = await paymentMethodRepository.create({
      name: 'any_name',
      is_active: false
    });
    const deleteByEntitySpy = jest.spyOn(
      paymentMethodRepository,
      'deleteByEntity'
    );

    await deletePaymentMethod.execute({
      payment_method_id: paymentMethod.payment_method_id
    });

    expect(deleteByEntitySpy).toHaveBeenLastCalledWith(paymentMethod);
  });
});
