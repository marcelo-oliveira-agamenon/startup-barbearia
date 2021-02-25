import { getRepository, Repository } from 'typeorm';
import IPaymentMethodRepository from '@modules/sales/repositories/IPaymentMethodRepository';
import PaymentMethod from '@modules/sales/infra/typeorm/entities/PaymentMethod';
import {
  ICreatePaymentMethodDTO,
  IListPaymentMethodsDTO,
  IGetPaymentMethodDTO
} from '@modules/sales/dtos/IPaymentMethodDTO';

export default class ServiceRepository implements IPaymentMethodRepository {
  private ormRepository: Repository<PaymentMethod>;

  constructor() {
    this.ormRepository = getRepository(PaymentMethod);
  }

  public async create(data: ICreatePaymentMethodDTO): Promise<PaymentMethod> {
    const paymentMethodInstance = this.ormRepository.create(data);
    const paymentMethod = await this.ormRepository.save(paymentMethodInstance);

    return paymentMethod;
  }

  public async findByName(name: string): Promise<PaymentMethod | undefined> {
    const paymentMethod = this.ormRepository.findOne({ name });

    return paymentMethod;
  }

  public async findAll(
    query: IListPaymentMethodsDTO
  ): Promise<PaymentMethod[]> {
    const { limit, offset } = query;
    const take = limit ? limit : 0,
      skip = offset ? offset : 0;

    const paymentMethods = this.ormRepository.find({ take, skip });

    return paymentMethods;
  }

  public async findById(
    query: IGetPaymentMethodDTO
  ): Promise<PaymentMethod | undefined> {
    const { payment_method_id } = query;
    const paymentMethod = this.ormRepository.findOne(payment_method_id);

    return paymentMethod;
  }
}
