import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateProductService from '@modules/sales/services/product/CreateProduct';

export default class ProductController {
    public async create(request: Request, response: Response): Promise<Response> {
        const data = request.body;
    
        const createProduct = container.resolve(CreateProductService);
        const product = await createProduct.execute(data);
        return response.status(201).json(product);
      }
}