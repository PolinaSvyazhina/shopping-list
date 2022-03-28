import { ProductModel } from '../Models/ProductModel';

export class ProductTransports {
  static init() {
    if (!localStorage.getItem('products')) localStorage.setItem('products', JSON.stringify([]));
  }

  static getProducts() {
    const e = localStorage.getItem('products');
    return JSON.parse(e) as ProductModel[];
  }

  static addProduct(product: ProductModel) {
    const e = this.getProducts();
    e.push(product);
    localStorage.setItem('products', JSON.stringify(e));
  }

  static removeProduct(id: string) {
    let e = this.getProducts();
    e = e.filter((e) => e.id !== id);
    localStorage.setItem('products', JSON.stringify(e));
  }

  static updateProduct(product: ProductModel) {
    const e = this.getProducts();
    e.filter((e) => e.id === product.id)[0] = product;
    localStorage.setItem('products', JSON.stringify(e));
  }
}
