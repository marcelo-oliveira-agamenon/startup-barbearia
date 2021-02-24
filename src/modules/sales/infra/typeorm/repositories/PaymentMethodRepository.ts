import { getRepository, Repository } from 'typeorm';
import IPaymentMethodRepository from '@modules/sales/repositories/IPaymentMethodRepository';
import PaymentMethod from '@modules/sales/infra/typeorm/entities/PaymentMethod';
import { ICreatePaymentMethodDTO } from '@modules/sales/dtos/IPaymentMethodDTO';

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
}
