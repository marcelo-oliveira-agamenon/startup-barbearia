import { container } from 'tsyringe';
import { Request, Response } from 'express';

export default class AnnotationController {
  public async create(request: Request, response: Response): Promise<Response> {
    return response.json();
  }
}
