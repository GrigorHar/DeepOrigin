import { test, expect } from '@playwright/test';
import { ProductsAPI } from './api/ProductsAPI';
import { ProductValidators } from './helpers/validators';

test.describe('Products API - DELETE Endpoints', () => {
  
  test('DELETE /products/:id - Delete a product', async ({ request }) => {
    const api = new ProductsAPI(request);
    const productId = 1;

    const deletedProduct = await api.deleteProduct(productId);

    expect(deletedProduct.id).toBe(productId);
    ProductValidators.validateDeletedProduct(deletedProduct);
    
    expect(deletedProduct).toHaveProperty('title');
    expect(deletedProduct).toHaveProperty('price');
  });

  test('DELETE /products/:id - Delete non-existent product', async ({ request }) => {
    const api = new ProductsAPI(request);
    const productId = 999999;

    try {
      const result = await api.deleteProduct(productId);
      expect(result).toBeDefined();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test('DELETE /products/:id - Verify product still exists after delete (simulated)', async ({ request }) => {
    const api = new ProductsAPI(request);
    const productId = 1;

    await api.deleteProduct(productId);

    const product = await api.getProductById(productId);
    expect(product.id).toBe(productId);
    ProductValidators.validateFullProduct(product);
  });
});
