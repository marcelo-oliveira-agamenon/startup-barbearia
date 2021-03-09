import { injectable, inject, container } from 'tsyringe';
import { ICreateSaleParamsDTO } from '@modules/sales/dtos/ISaleDTO';

import ISaleRepository from '@modules/sales/repositories/ISaleRepository';

import Sale from '@modules/sales/infra/typeorm/entities/Sale';

import AppError from '@shared/errors/AppError';

import { GetUserService } from '@modules/users/services/user';
import { GetClientService } from '@modules/users/services/client';

@injectable()
export class CreateSaleService {
  constructor(
    @inject('SaleRepository')
    private saleRepository: ISaleRepository
  ) {}

  public async execute(data: ICreateSaleParamsDTO): Promise<Sale> {
    const { user_id, client_id, value, discount, is_discount_fixed } = data;

    const getUser = container.resolve(GetUserService);
    await getUser.execute({ user_id });

    const saleInstance = { user_id, value, discount, is_discount_fixed };

    if (client_id) {
      const getClient = container.resolve(GetClientService);
      const client = await getClient.execute({ client_id });

      Object.defineProperties(saleInstance, {
        client_id: { value: client.client_id }
      });
    }

    const sale = await this.saleRepository.create(saleInstance);
    if (!sale)
      throw new AppError('Something went wrong! Sale has not been created!');

    return sale;
  }
}
