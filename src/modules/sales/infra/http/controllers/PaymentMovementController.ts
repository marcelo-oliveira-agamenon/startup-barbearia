import { Request, Response } from 'express';
import { CreatePaymentMovementService } from '@modules/sales/services/paymentMovement/CreatePaymentMovementService';
import { container } from 'tsyringe';

export default class PaymentMovementController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createPaymentMovement = container.resolve(
      CreatePaymentMovementService
    );
    const paymentMovement = await createPaymentMovement.execute(data);

    return response.status(201).json(paymentMovement);
  }
}
