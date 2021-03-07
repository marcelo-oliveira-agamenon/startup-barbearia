import { injectable, inject, container } from 'tsyringe';
import { ICreateSaleParamsDTO } from '@modules/sales/dtos/ISaleDTO';

import ISaleRepository from '@modules/sales/repositories/ISaleRepository';

import Sale from '@modules/sales/infra/typeorm/entities/Sale';

import AppError from '@shared/errors/AppError';

import GetUserService from '@modules/users/services/user/GetUserService';
import { GetClientService } from '@modules/users/services/client';

@injectable()
export default class CreateSaleService {
  constructor(
    @inject('SaleRepository')
    private saleRepository: ISaleRepository
  ) {}

  public async execute(data: ICreateSaleParamsDTO): Promise<Sale> {
    const { user_id, client_id, value, discount, is_discount_fixed } = data;

    const getUser = container.resolve(GetUserService);
    const user = await getUser.execute({ user_id });

    const saleInstance = { user, value, discount, is_discount_fixed };

    if (client_id) {
      const getClient = container.resolve(GetClientService);
      const client = await getClient.execute({ client_id });
      Object.defineProperties(saleInstance, {
        client: { value: client }
      });
    }

    const sale_id = await this.saleRepository.create(saleInstance);
    if (!sale_id) throw new AppError('Sale has not been created!');

    const sale = await this.saleRepository.findOne(sale_id);
    if (!sale) throw new AppError('Something went wrong!');

    return sale;
  }
}
