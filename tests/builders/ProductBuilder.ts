import { AddProductRequest, UpdateProductRequest } from '../types';

export class ProductBuilder {
  private product: AddProductRequest = {
    title: 'Test Product',
    description: 'Test product description',
    price: 99.99,
    discountPercentage: 10.0,
    rating: 4.5,
    stock: 100,
    brand: 'TestBrand',
    category: 'electronics',
    thumbnail: 'https://example.com/thumbnail.jpg',
    images: ['https://example.com/image1.jpg']
  };

  static create(): ProductBuilder {
    return new ProductBuilder();
  }

  withTitle(title: string): ProductBuilder {
    this.product.title = title;
    return this;
  }

  withDescription(description: string): ProductBuilder {
    this.product.description = description;
    return this;
  }

  withPrice(price: number): ProductBuilder {
    this.product.price = price;
    return this;
  }

  withDiscount(discountPercentage: number): ProductBuilder {
    this.product.discountPercentage = discountPercentage;
    return this;
  }

  withRating(rating: number): ProductBuilder {
    this.product.rating = rating;
    return this;
  }

  withStock(stock: number): ProductBuilder {
    this.product.stock = stock;
    return this;
  }

  withBrand(brand: string): ProductBuilder {
    this.product.brand = brand;
    return this;
  }

  withCategory(category: string): ProductBuilder {
    this.product.category = category;
    return this;
  }

  withImages(images: string[]): ProductBuilder {
    this.product.images = images;
    return this;
  }

  minimal(): ProductBuilder {
    this.product = { title: 'Minimal Product' };
    return this;
  }

  build(): AddProductRequest {
    return { ...this.product };
  }

  buildUpdate(): UpdateProductRequest {
    return { ...this.product };
  }
}
