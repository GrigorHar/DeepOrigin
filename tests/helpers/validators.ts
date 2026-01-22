import { expect } from '@playwright/test';
import { Product, ProductsResponse, SingleProductResponse, DeleteProductResponse } from '../types';

export class ProductValidators {
  static validateProduct(product: Product): void {
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('title');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('category');
    expect(typeof product.id).toBe('number');
    expect(typeof product.title).toBe('string');
    expect(typeof product.price).toBe('number');
  }

  static validateFullProduct(product: SingleProductResponse): void {
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('title');
    expect(product).toHaveProperty('description');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('discountPercentage');
    expect(product).toHaveProperty('rating');
    expect(product).toHaveProperty('stock');
    expect(product).toHaveProperty('brand');
    expect(product).toHaveProperty('category');
    expect(product).toHaveProperty('thumbnail');
    expect(product).toHaveProperty('images');
    expect(Array.isArray(product.images)).toBe(true);
  }

  static validateProductsResponse(response: ProductsResponse): void {
    expect(response).toHaveProperty('products');
    expect(response).toHaveProperty('total');
    expect(response).toHaveProperty('skip');
    expect(response).toHaveProperty('limit');
    expect(Array.isArray(response.products)).toBe(true);
  }

  static validateSortedByPriceAsc(products: Product[]): void {
    if (products.length > 1) {
      const prices = products.map(p => p.price);
      const sortedPrices = [...prices].sort((a, b) => a - b);
      expect(prices).toEqual(sortedPrices);
    }
  }

  static validateSortedByPriceDesc(products: Product[]): void {
    if (products.length > 1) {
      const prices = products.map(p => p.price);
      const sortedPrices = [...prices].sort((a, b) => b - a);
      expect(prices).toEqual(sortedPrices);
    }
  }

  static validateSortedByTitleAsc(products: Product[]): void {
    if (products.length > 1) {
      const titles = products.map(p => p.title);
      const sortedTitles = [...titles].sort((a, b) => a.localeCompare(b));
      expect(titles).toEqual(sortedTitles);
    }
  }

  static validateProductsCategory(products: Product[], category: string): void {
    products.forEach(product => {
      expect(product.category.toLowerCase()).toBe(category.toLowerCase());
    });
  }

  static validateSearchResults(products: Product[], searchTerm: string): void {
    if (products.length > 0) {
      const hasMatchingProduct = products.some(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      expect(hasMatchingProduct).toBe(true);
    }
  }

  static validateDeletedProduct(response: DeleteProductResponse): void {
    expect(response).toHaveProperty('isDeleted', true);
    expect(response).toHaveProperty('deletedOn');
    expect(typeof response.deletedOn).toBe('string');
    expect(new Date(response.deletedOn).toString()).not.toBe('Invalid Date');
  }
}
