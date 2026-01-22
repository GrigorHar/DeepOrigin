import { APIRequestContext } from '@playwright/test';
import {
  ProductsResponse,
  SingleProductResponse,
  AddProductRequest,
  UpdateProductRequest,
  DeleteProductResponse
} from '../types';

export class ProductsAPI {
  constructor(private request: APIRequestContext) {}

  async getAllProducts(params?: {
    limit?: number;
    skip?: number;
    select?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
  }): Promise<ProductsResponse> {
    const queryParams = new URLSearchParams();
    if (params?.limit !== undefined) queryParams.append('limit', params.limit.toString());
    if (params?.skip !== undefined) queryParams.append('skip', params.skip.toString());
    if (params?.select) queryParams.append('select', params.select);
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.order) queryParams.append('order', params.order);

    const url = `/products${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await this.request.get(url);
    return response.json();
  }

  async getProductById(id: number): Promise<SingleProductResponse> {
    const response = await this.request.get(`/products/${id}`);
    return response.json();
  }

  async searchProducts(query: string): Promise<ProductsResponse> {
    const response = await this.request.get(`/products/search?q=${encodeURIComponent(query)}`);
    return response.json();
  }

  async getCategories(): Promise<string[]> {
    const response = await this.request.get('/products/categories');
    return response.json();
  }

  async getCategoryList(): Promise<string[]> {
    const response = await this.request.get('/products/category-list');
    return response.json();
  }

  async getProductsByCategory(category: string): Promise<ProductsResponse> {
    const response = await this.request.get(`/products/category/${category}`);
    return response.json();
  }

  async addProduct(product: AddProductRequest): Promise<SingleProductResponse> {
    const response = await this.request.post('/products/add', {
      data: product,
      headers: { 'Content-Type': 'application/json' }
    });
    return response.json();
  }

  async updateProduct(id: number, product: UpdateProductRequest): Promise<SingleProductResponse> {
    const response = await this.request.put(`/products/${id}`, {
      data: product,
      headers: { 'Content-Type': 'application/json' }
    });
    return response.json();
  }

  async patchProduct(id: number, product: UpdateProductRequest): Promise<SingleProductResponse> {
    const response = await this.request.patch(`/products/${id}`, {
      data: product,
      headers: { 'Content-Type': 'application/json' }
    });
    return response.json();
  }

  async deleteProduct(id: number): Promise<DeleteProductResponse> {
    const response = await this.request.delete(`/products/${id}`);
    return response.json();
  }

  async getProductByIdWithStatus(id: number): Promise<{ status: number; data?: SingleProductResponse }> {
    const response = await this.request.get(`/products/${id}`);
    const status = response.status();
    if (status === 200) {
      return { status, data: await response.json() };
    }
    return { status };
  }
}
