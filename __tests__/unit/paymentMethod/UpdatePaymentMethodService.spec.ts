import { connection } from '../../config';
import { UpdatePaymentMethodService } from '@modules/sales/services/paymentMethod/UpdatePaymentMethodService';
import PaymentMethodRepository from '@modules/sales/infra/typeorm/repositories/PaymentMethodRepository';

import AppError from '@shared/errors/AppError';

describe('Should validate payment method update service', () => {
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

    const updatePaymentMethod = new UpdatePaymentMethodService(
      paymentMethodRepository
    );

    const promise = updatePaymentMethod.execute({ payment_method_id: 1 });
    await expect(promise).rejects.toEqual(
      new AppError('This payment method does not exist!')
    );
  });

  test('Should update payment method with correct data', async () => {
    const paymentMethodRepository = new PaymentMethodRepository();

    const updatePaymentMethod = new UpdatePaymentMethodService(
      paymentMethodRepository
    );
    const paymentMethodCreated = await paymentMethodRepository.create({
      name: 'cash',
      is_active: false
    });
    const paymentMethodUpdated = await updatePaymentMethod.execute({
      payment_method_id: paymentMethodCreated.payment_method_id,
      name: 'debit-card',
      is_active: true
    });

    expect(paymentMethodUpdated).toEqual(
      Object.assign({}, paymentMethodCreated, {
        name: 'debit-card',
        is_active: true,
        updated_at: paymentMethodUpdated.updated_at
      })
    );
  });

  test('Should call findById method with correct param', async () => {
    const paymentMethodRepository = new PaymentMethodRepository();

    const updatePaymentMethod = new UpdatePaymentMethodService(
      paymentMethodRepository
    );
    const findByIdSpy = jest.spyOn(paymentMethodRepository, 'findById');
    const paymentMethodCreated = await paymentMethodRepository.create({
      name: 'any_name',
      is_active: false
    });
    await updatePaymentMethod.execute({
      payment_method_id: paymentMethodCreated.payment_method_id
    });

    expect(findByIdSpy).toHaveBeenLastCalledWith(
      paymentMethodCreated.payment_method_id
    );
  });
  test('Should call update method with correct param', async () => {
    const paymentMethodRepository = new PaymentMethodRepository();
    const updatePaymentMethod = new UpdatePaymentMethodService(
      paymentMethodRepository
    );

    const updateByIdSpy = jest.spyOn(paymentMethodRepository, 'update');
    const findByIdSpy = jest.spyOn(paymentMethodRepository, 'findById');

    const paymentMethodCreated = await paymentMethodRepository.create({
      name: 'any_name',
      is_active: false
    });
    await updatePaymentMethod.execute({
      payment_method_id: paymentMethodCreated.payment_method_id,
      name: 'gui',
      is_active: true
    });

    const paymentMethodUpdated = Object.assign(
      {},
      await findByIdSpy.mock.results[0].value,
      { name: 'gui', is_active: true }
    );
    expect(updateByIdSpy).toHaveBeenLastCalledWith(paymentMethodUpdated);
  });
});
