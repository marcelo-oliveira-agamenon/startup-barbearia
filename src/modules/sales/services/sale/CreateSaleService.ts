import { injectable, inject } from 'tsyringe';
import { ICreateSaleParamsDTO } from '@modules/sales/dtos/ISaleDTO';

import ISaleRepository from '@modules/sales/repositories/ISaleRepository';

import Sale from '@modules/sales/infra/typeorm/entities/Sale';

import AppError from '@shared/errors/AppError';

import IClientRepository from '@modules/users/repositories/IClientRepository';

@injectable()
export class CreateSaleService {
  constructor(
    @inject('SaleRepository')
    private saleRepository: ISaleRepository,
    @inject('ClientRepository')
    private clientRepository: IClientRepository,
    @inject('UserRepository')
    private userRepository: IClientRepository
  ) {}

  public async execute(data: ICreateSaleParamsDTO): Promise<Sale> {
    const { client_id, ...saleData } = data;
    const user = await this.userRepository.findOne(saleData.user_id);
    if (!user) throw new AppError('User does not exist!');

    if (client_id) {
      const client = await this.clientRepository.findOne(client_id);
      if (!client) throw new AppError('Client does not exist!');
      Object.defineProperties(saleData, {
        client_id: { value: client_id }
      });
    }

    const sale = await this.saleRepository.create(saleData);
    if (!sale)
      throw new AppError('Something went wrong! Sale has not been created!');

    return sale;
  }
}
