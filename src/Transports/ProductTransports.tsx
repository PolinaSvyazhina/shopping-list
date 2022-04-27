import { ProductModel } from '../models/ProductStore.types';

export class ProductTransports {
  static getProducts(): ProductModel[] {
    const products = localStorage.getItem('products');
    if (!products) {
      return [];
    }
    return JSON.parse(products);
  }

  static addProduct(product: ProductModel) {
    const products = this.getProducts();
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
  }

  static removeProduct(id: string) {
    const products = this.getProducts().filter((e) => e.id !== id);
    localStorage.setItem('products', JSON.stringify(products));
  }

  static updateProduct(product: ProductModel) {
    const products = this.getProducts();
    const index = products.findIndex((e) => e.id === product.id);
    products[index] = product;
    localStorage.setItem('products', JSON.stringify(products));
  }

  static clearLocalStorage() {
    localStorage.clear();
  }
}
