import { test, expect } from '@playwright/test';
import { ProductsAPI } from './api/ProductsAPI';
import { ProductBuilder } from './builders/ProductBuilder';
import { ProductValidators } from './helpers/validators';

test.describe('Products API - PUT/PATCH Endpoints', () => {
  
  test('PUT /products/:id - Update a product', async ({ request }) => {
    const api = new ProductsAPI(request);
    const productId = 1;
    const updateData = ProductBuilder.create()
      .withTitle('iPhone Galaxy +1')
      .buildUpdate();

    const product = await api.updateProduct(productId, updateData);

    expect(product.id).toBe(productId);
    expect(product.title).toBe(updateData.title);
    
    ProductValidators.validateFullProduct(product);
  });

  test('PATCH /products/:id - Partially update a product', async ({ request }) => {
    const api = new ProductsAPI(request);
    const productId = 1;
    const updateData = ProductBuilder.create()
      .withPrice(999.99)
      .withStock(50)
      .buildUpdate();

    const product = await api.patchProduct(productId, updateData);

    expect(product.id).toBe(productId);
    expect(product.price).toBe(updateData.price);
    expect(product.stock).toBe(updateData.stock);
  });

  test('PUT /products/:id - Update multiple fields', async ({ request }) => {
    const api = new ProductsAPI(request);
    const productId = 2;
    const updateData = ProductBuilder.create()
      .withTitle('Updated Product Title')
      .withDescription('Updated description')
      .withPrice(199.99)
      .withRating(4.8)
      .buildUpdate();

    const product = await api.updateProduct(productId, updateData);

    expect(product.id).toBe(productId);
    expect(product.title).toBe(updateData.title);
    expect(product.description).toBe(updateData.description);
    expect(product.price).toBe(updateData.price);
    expect(product.rating).toBe(updateData.rating);
  });

  test('PUT /products/:id - Update non-existent product', async ({ request }) => {
    const api = new ProductsAPI(request);
    const productId = 999999;
    const updateData = ProductBuilder.create()
      .withTitle('Non-existent Product')
      .buildUpdate();

    try {
      await api.updateProduct(productId, updateData);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
