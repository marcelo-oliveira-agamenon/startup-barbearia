import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  CreatePaymentMovementService,
  GetPaymentMovementService,
  ListPaymentMovementsService,
  UpdatePaymentMovementService,
  DeletePaymentMovementService
} from '@modules/sales/services/paymentMovement';

export default class PaymentMovementController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createPaymentMovement = container.resolve(
      CreatePaymentMovementService
    );
    const paymentMovement = await createPaymentMovement.execute(data);

    return response.status(201).json(paymentMovement);
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { payment_movement_id } = request.params;

    const getPaymentMovement = container.resolve(GetPaymentMovementService);
    const paymentMovement = await getPaymentMovement.execute({
      payment_movement_id
    });

    return response.status(200).json(paymentMovement);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const query = request.query;

    const listPaymentMovements = container.resolve(ListPaymentMovementsService);
    const paymentMethods = await listPaymentMovements.execute(query);

    return response.status(200).json(paymentMethods);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { payment_movement_id } = request.params;
    const params = request.body;

    const updatePaymentMovement = container.resolve(
      UpdatePaymentMovementService
    );
    const paymentMovement = await updatePaymentMovement.execute(
      payment_movement_id,
      params
    );
    return response.status(200).json(paymentMovement);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { payment_movement_id } = request.params;

    const deletePaymentMovement = container.resolve(
      DeletePaymentMovementService
    );
    const paymentMovement = await deletePaymentMovement.execute({
      payment_movement_id
    });

    return response.status(200).json(paymentMovement);
  }
}
