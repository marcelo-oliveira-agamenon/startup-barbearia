import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateProductService from '@modules/sales/services/product/CreateProduct';
import GetProductsListService from '@modules/sales/services/product/GetProductsList';
import GetProductService from '@modules/sales/services/product/GetProductService';

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
        const products = await getProductsList.execute(query);
    
        return response.status(200).json(products);
      }

      public async get(request: Request, response: Response): Promise<Response> {
        const { product_id } = request.params;
    
        const getProduct = container.resolve(GetProductService);
        const product = await getProduct.execute({ product_id });
    
        return response.status(200).json(product);
      }
}