import AppError from '@shared/errors/AppError';
import { connection } from '../../config';
import { CreatePaymentMethodService } from '@modules/sales/services/paymentMethod/CreatePaymentMethodService';
import PaymentMethodRepository from '@modules/sales/infra/typeorm/repositories/PaymentMethodRepository';

let paymentMethodRepository: PaymentMethodRepository,
  createPaymentMethodService: CreatePaymentMethodService;

const paymentMethodSchema = {
  name: 'cash',
  is_active: true
};

describe('Should validate create user service', () => {
  beforeAll(async () => {
    await connection.create();
  });
  beforeEach(async () => {
    paymentMethodRepository = new PaymentMethodRepository();
    createPaymentMethodService = new CreatePaymentMethodService(
      paymentMethodRepository
    );
  });
  afterEach(async () => {
    await connection.clear();
  });
  afterAll(async () => {
    await connection.close();
  });

  test('Should throws if payment method name already exists', async () => {
    await paymentMethodRepository.create(paymentMethodSchema);

    const promise = createPaymentMethodService.execute({
      ...paymentMethodSchema
    });

    await expect(promise).rejects.toEqual(
      new AppError('This payment method already exists!')
    );
  });

  test('Should call findByName method with correct param', async () => {
    const findByNameSpy = jest.spyOn(paymentMethodRepository, 'findByName');
    const data = Object.assign({}, paymentMethodSchema, {
      name: 'credit-card'
    });

    await createPaymentMethodService.execute(data);
    expect(findByNameSpy).toHaveBeenLastCalledWith('credit-card');
  });

  test('Should call create method with correct param', async () => {
    const createSpy = jest.spyOn(paymentMethodRepository, 'create');

    await createPaymentMethodService.execute({ ...paymentMethodSchema });
    expect(createSpy).toHaveBeenCalledWith({ name: 'cash', is_active: true });
  });
  test('Should return payment method with correct values', async () => {
    const createSpyOn = jest.spyOn(paymentMethodRepository, 'create');
    const paymentMethod = await createPaymentMethodService.execute({
      ...paymentMethodSchema
    });

    const result = Object.assign({}, await createSpyOn.mock.results[0].value, {
      name: 'cash'
    });

    expect(paymentMethod).toEqual(result);
  });
});
