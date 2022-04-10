import { ProductModel } from '../models/ProductStore.types';

export class ProductTransports {
  static getProducts(): ProductModel[] {
    const e = localStorage.getItem('products');
    if (!e) {
      return [];
    }
    return JSON.parse(e);
  }

  static addProduct(product: ProductModel) {
    const e = this.getProducts();
    e.push(product);
    localStorage.setItem('products', JSON.stringify(e));
  }

  static removeProduct(id: string) {
    const e = this.getProducts().filter((e) => e.id !== id);
    localStorage.setItem('products', JSON.stringify(e));
  }

  static updateProduct(product: ProductModel) {
    const e = this.getProducts();
    e.filter((e) => e.id === product.id)[0] = product;
    localStorage.setItem('products', JSON.stringify(e));
  }

  static clearLocalStorage() {
    localStorage.clear();
  }
}
