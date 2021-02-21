import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateProductService from '@modules/sales/services/product/CreateProduct';
import GetProductsListService from '@modules/sales/services/product/GetProductsList';

export default class ProductController {
    public async create(request: Request, response: Response): Promise<Response> {
        const data = request.body;
    
        const createProduct = container.resolve(CreateProductService);
        const product = await createProduct.execute(data);
        return response.status(201).json(product);
      }

      public async list(request: Request, response: Response): Promise<Response> {
        const query = request.query;
    
        const getProductsList = container.resolve(GetProductsListService);
        const clients = await getProductsList.execute(query);
    
        return response.status(200).json(clients);
      }
}