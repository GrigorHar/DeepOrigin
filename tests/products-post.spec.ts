import { test, expect } from '@playwright/test';
import { ProductsAPI } from './api/ProductsAPI';
import { ProductBuilder } from './builders/ProductBuilder';
import { ProductValidators } from './helpers/validators';

test.describe('Products API - POST Endpoints', () => {
  
  test('POST /products/add - Add a new product', async ({ request }) => {
    const api = new ProductsAPI(request);
    const newProduct = ProductBuilder.create()
      .withTitle('BMW Pencil')
      .withDescription('Premium BMW branded pencil')
      .withPrice(9.99)
      .withDiscount(5.0)
      .withRating(4.5)
      .withStock(100)
      .withBrand('BMW')
      .withCategory('office-supplies')
      .withImages([
        'https://example.com/pencil1.jpg',
        'https://example.com/pencil2.jpg'
      ])
      .build();

    const product = await api.addProduct(newProduct);

    expect(product).toHaveProperty('id');
    expect(product.title).toBe(newProduct.title);
    expect(product.description).toBe(newProduct.description);
    expect(product.price).toBe(newProduct.price);
    expect(product.brand).toBe(newProduct.brand);
    expect(product.category).toBe(newProduct.category);
    
    expect(typeof product.id).toBe('number');
    expect(product.id).toBeGreaterThan(0);
  });

  test('POST /products/add - Add product with minimal required fields', async ({ request }) => {
    const api = new ProductsAPI(request);
    const minimalProduct = ProductBuilder.create().minimal().build();

    const product = await api.addProduct(minimalProduct);

    expect(product.title).toBe(minimalProduct.title);
    expect(product).toHaveProperty('id');
    ProductValidators.validateProduct(product);
  });
});
