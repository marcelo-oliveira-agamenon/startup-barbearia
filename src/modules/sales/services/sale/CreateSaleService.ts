import { injectable, inject, container } from 'tsyringe';
import { ICreateSaleDTO } from '@modules/sales/dtos/ISaleDTO';

import ISaleRepository from '@modules/sales/repositories/ISaleRepository';

import Sale from '@modules/sales/infra/typeorm/entities/Sale';

import AppError from '@shared/errors/AppError';

import GetUserService from '@modules/users/services/user/GetUserService';
import GetClientService from '@modules/users/services/client/GetClientService';

@injectable()
export default class CreateSaleService {
  constructor(
    @inject('SaleRepository')
    private saleRepository: ISaleRepository
  ) {}

  public async execute(data: ICreateSaleDTO): Promise<Sale> {
    const { user_id, client_id } = data;

    const getUser = container.resolve(GetUserService);
    await getUser.execute({ user_id });

    if (client_id) {
      const getClient = container.resolve(GetClientService);
      await getClient.execute({ client_id });
    }

    const sale_id = await this.saleRepository.create(data);
    if (!sale_id) throw new AppError('Sale has not been created!');

    const sale = await this.saleRepository.findOne(sale_id);
    if (!sale) throw new AppError('Something went wrong!');

    return sale;
  }
}
