import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreatePaymentMethodService from '@modules/sales/services/paymentMethod/CreatePaymentMethodService';
import ListPaymentMethodsService from '@modules/sales/services/paymentMethod/ListPaymentMethodsService';
import GetPaymentMethodService from '@modules/sales/services/paymentMethod/GetPaymentMethodService';
import UpdatePaymentMethodService from '@modules/sales/services/paymentMethod/UpdatePaymentMethodService';
import DeletePaymentMethodService from '@modules/sales/services/paymentMethod/DeletePaymentMethodService';

export default class PaymentMethodController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createPaymentMethod = container.resolve(CreatePaymentMethodService);
    const paymentMethod = await createPaymentMethod.execute(data);

    return response.status(201).json(paymentMethod);
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { payment_method_id } = request.params;

    const getPaymentMethod = container.resolve(GetPaymentMethodService);
    const paymentMethod = await getPaymentMethod.execute({
      payment_method_id: +payment_method_id
    });

    return response.status(200).json(paymentMethod);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const query = request.query;

    const listPaymentMethods = container.resolve(ListPaymentMethodsService);
    const paymentMethods = await listPaymentMethods.execute(query);

    return response.status(200).json(paymentMethods);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { payment_method_id } = request.params;

    const deletePaymentMethod = container.resolve(DeletePaymentMethodService);
    const paymentMethod = await deletePaymentMethod.execute({
      payment_method_id: +payment_method_id
    });

    return response.status(200).json(paymentMethod);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { payment_method_id } = request.params;
    const params = { ...request.body, payment_method_id };

    const updatePaymentMethod = container.resolve(UpdatePaymentMethodService);
    const paymentMethod = await updatePaymentMethod.execute(params);
    return response.status(200).json(paymentMethod);
  }
}
