import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreatePaymentMethodService from '@modules/sales/services/paymentMethod/CreatePaymentMethodService';

export default class PaymentMethodController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createPaymentMethod = container.resolve(CreatePaymentMethodService);
    const paymentMethod = createPaymentMethod.execute(data);

    return response.status(201).json(paymentMethod);
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { service_id } = request.params;

    return response.status(200).json();
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const query = request.query;

    return response.status(200).json();
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { service_id } = request.params;

    return response.status(200).json();
  }

  public async update(request: Request, response: Response): Promise<Response> {
    return response.status(200).json();
  }
}
