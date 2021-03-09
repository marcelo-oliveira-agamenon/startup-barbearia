import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import {
  CreateProductService,
  ListProductsService,
  GetProductService,
  UpdateProductService,
  DeleteProductService
} from '@modules/sales/services/product';

export default class ProductController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createProduct = container.resolve(CreateProductService);
    const product = await createProduct.execute(data);
    return response.status(201).json(product);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const query = request.query;

    const listProducts = container.resolve(ListProductsService);
    const products = await listProducts.execute(query);

    return response.status(200).json(products);
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.params;

    const getProduct = container.resolve(GetProductService);
    const product = await getProduct.execute({ product_id });

    return response.status(200).json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const { product_id } = request.params;

    const updateProduct = container.resolve(UpdateProductService);
    const product = await updateProduct.execute(data, product_id);

    return response.status(200).json(classToClass(product));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.params;

    const deleteProduct = container.resolve(DeleteProductService);
    const product = await deleteProduct.execute({ product_id });

    return response.status(200).json(product);
  }
}
