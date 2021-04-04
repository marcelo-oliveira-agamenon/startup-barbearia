import { connection } from '../../config';
import { CreatePaymentMethodService } from '@modules/sales/services/paymentMethod/CreatePaymentMethodService';
import PaymentMethodRepository from '@modules/sales/infra/typeorm/repositories/PaymentMethodRepository';

import AppError from '@shared/errors/AppError';

describe('Should validate payment method create service', () => {
  beforeAll(async () => {
    await connection.create();
  });
  beforeEach(async () => {
    await connection.clear();
  });
  afterAll(async () => {
    await connection.close();
  });

  test('Should throws if payment method name already exists', async () => {
    const paymentMethodRepository = new PaymentMethodRepository();

    const createPaymentMethod = new CreatePaymentMethodService(
      paymentMethodRepository
    );

    jest.spyOn(paymentMethodRepository, 'findByName').mockReturnValueOnce(
      new Promise((resolve) =>
        resolve({
          payment_method_id: 1,
          name: 'any_name',
          is_active: true,
          created_at: new Date('2021-02-01'),
          updated_at: new Date('2021-02-01')
        })
      )
    );
    const promise = createPaymentMethod.execute({ name: 'any_name' });
    await expect(promise).rejects.toEqual(
      new AppError('This payment method already exists!')
    );
  });
  test('Should return payment method values if it is created', async () => {
    const paymentMethodRepository = new PaymentMethodRepository();
    const createPaymentMethod = new CreatePaymentMethodService(
      paymentMethodRepository
    );
    jest.spyOn(paymentMethodRepository, 'create').mockReturnValueOnce(
      new Promise((resolve) =>
        resolve({
          payment_method_id: 1,
          name: 'any_name',
          is_active: true,
          created_at: new Date('2021-02-01'),
          updated_at: new Date('2021-02-01')
        })
      )
    );
    const paymentMethod = await createPaymentMethod.execute({
      name: 'any_name',
      is_active: true
    });

    expect(paymentMethod).toEqual({
      payment_method_id: 1,
      name: 'any_name',
      is_active: true,
      created_at: new Date('2021-02-01'),
      updated_at: new Date('2021-02-01')
    });
  });

  test('Should call payment method findByName method with correct param', async () => {
    const paymentMethodRepository = new PaymentMethodRepository();
    const createPaymentMethod = new CreatePaymentMethodService(
      paymentMethodRepository
    );
    const findByNameSpy = jest.spyOn(paymentMethodRepository, 'findByName');

    await createPaymentMethod.execute({
      name: 'credit-card'
    });

    expect(findByNameSpy).toHaveBeenCalledWith('credit-card');
  });
  test('Should call payment method create method with correct params', async () => {
    const paymentMethodRepository = new PaymentMethodRepository();
    const createPaymentMethod = new CreatePaymentMethodService(
      paymentMethodRepository
    );
    const createSpy = jest.spyOn(paymentMethodRepository, 'create');
    await createPaymentMethod.execute({
      name: 'cash',
      is_active: false
    });

    expect(createSpy).toHaveBeenCalledWith({ name: 'cash', is_active: false });
  });
});
