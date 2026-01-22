import { test, expect } from '@playwright/test';
import { ProductsAPI } from './api/ProductsAPI';
import { ProductValidators } from './helpers/validators';

test.describe('Products API - GET Endpoints', () => {
  
  test('GET /products - Get all products', async ({ request }) => {
    const api = new ProductsAPI(request);
    const data = await api.getAllProducts();
    
    ProductValidators.validateProductsResponse(data);
    
    expect(data.limit).toBe(30);
    expect(data.skip).toBe(0);
    expect(data.products.length).toBeGreaterThan(0);
    expect(data.products.length).toBeLessThanOrEqual(30);
    
    if (data.products.length > 0) {
      ProductValidators.validateProduct(data.products[0]);
    }
  });

  test('GET /products/:id - Get a single product', async ({ request }) => {
    const api = new ProductsAPI(request);
    const productId = 1;
    const product = await api.getProductById(productId);
    
    expect(product.id).toBe(productId);
    ProductValidators.validateFullProduct(product);
  });

  test('GET /products/:id - Get non-existent product returns 404', async ({ request }) => {
    const api = new ProductsAPI(request);
    const result = await api.getProductByIdWithStatus(999999);
    expect(result.status).toBe(404);
  });

  test('GET /products/search?q=phone - Search products', async ({ request }) => {
    const api = new ProductsAPI(request);
    const searchQuery = 'phone';
    const data = await api.searchProducts(searchQuery);
    
    ProductValidators.validateProductsResponse(data);
    ProductValidators.validateSearchResults(data.products, searchQuery);
  });

  test('GET /products/search?q= - Empty search query', async ({ request }) => {
    const api = new ProductsAPI(request);
    const data = await api.searchProducts('');
    
    ProductValidators.validateProductsResponse(data);
  });

  test('GET /products?limit=10&skip=10 - Limit and skip products', async ({ request }) => {
    const api = new ProductsAPI(request);
    const limit = 10;
    const skip = 10;
    const data = await api.getAllProducts({ limit, skip });
    
    expect(data.limit).toBe(limit);
    expect(data.skip).toBe(skip);
    expect(data.products.length).toBeLessThanOrEqual(limit);
  });

  test('GET /products?limit=0 - Get all products with limit=0', async ({ request }) => {
    const api = new ProductsAPI(request);
    const data = await api.getAllProducts({ limit: 0 });
    
    expect(data.limit).toBe(0);
    expect(data.products.length).toBeGreaterThan(0);
    expect(data.products.length).toBe(data.total);
  });

  test('GET /products?select=title,price - Select specific fields', async ({ request }) => {
    const api = new ProductsAPI(request);
    const data = await api.getAllProducts({ select: 'title,price', limit: 5 });
    
    if (data.products.length > 0) {
      const product = data.products[0];
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('title');
      expect(product).toHaveProperty('price');
      expect(product).not.toHaveProperty('description');
      expect(product).not.toHaveProperty('images');
    }
  });

  test('GET /products?sortBy=price&order=desc - Sort products descending', async ({ request }) => {
    const api = new ProductsAPI(request);
    const data = await api.getAllProducts({ sortBy: 'price', order: 'desc', limit: 10 });
    
    ProductValidators.validateSortedByPriceDesc(data.products);
  });

  test('GET /products/category-list - Get products category list', async ({ request }) => {
    const api = new ProductsAPI(request);
    const categoryList = await api.getCategoryList();
    
    expect(Array.isArray(categoryList)).toBe(true);
    expect(categoryList.length).toBeGreaterThan(0);
  });

  test('GET /products/category/smartphones - Get products by category', async ({ request }) => {
    const api = new ProductsAPI(request);
    const category = 'smartphones';
    const data = await api.getProductsByCategory(category);
    
    ProductValidators.validateProductsResponse(data);
    
    if (data.products.length > 0) {
      ProductValidators.validateProductsCategory(data.products, category);
    }
  });

  test('GET /products/category/invalid - Invalid category returns empty or error', async ({ request }) => {
    const api = new ProductsAPI(request);
    const data = await api.getProductsByCategory('invalidcategory123');
    
    expect(data.products.length).toBe(0);
  });
});
